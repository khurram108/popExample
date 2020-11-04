let router = require('express').Router()
let User = require("../model/register")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var short = require('short-uuid');
const Deshbaord = require("../model/deshboard")
const Referral = require('../model/referrals')
const nodemailer = require("nodemailer");
const request = require('request');






router.post("/register_user", async (req, res) => {


  let data = Object.assign({}, req.body)

  let { email, password, Fname, Lname, agreement, referred_by } = data

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(200).json("User already exist")
    }
    var decimalTranslator = short("0123456789");
    var uuid = decimalTranslator.new()
    let length = uuid.length
    let newUUID = uuid.slice(length - 8, length)

    const newUser = new User({
      email,
      password,
      Fname,
      Lname,
      agreement,
      uuid: newUUID,
      referred_by
    })


    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) throw err
        newUser.password = hash
        newUser.save().then((user2) => {



          const newDeshboard = new Deshbaord({
            userID: user2._id
          })
          newDeshboard.save()

          if (referred_by) {
            let newReferral = new Referral({
              userID: user2._id,
              uuid: referred_by,
              name: Fname + " " + Lname
            })
            newReferral.save()

            User.findOne({ uuid: referred_by }).then(referred_by_user => {
              Deshbaord.findOne({ userID: referred_by_user._id }).then(deshboard => {
                let data = {
                  referral_earning: deshboard.referral_earning + 10,
                  available_balance: deshboard.available_balance + 10
                }
                Deshbaord.findOneAndUpdate({ userID: referred_by_user._id }, data).then(updated => {
                  console.log(updated);
                })
              })
            })

          }
          jwt.sign({ id: user2._id },
            "This is my secret key",
            { expiresIn: "7d" },
            (err, token) => {
              if (err) {
                res.json(err)
              }
              if (!err) {
                // emailConfirmation(email)
                request.post({
                  headers: { 'content-type': 'application/json' },
                  url: "https://popexample.herokuapp.com/send_mail",
                  json: {
                    email
                  }
                }, function (error, response, body) {
                })
                res.json({
                  token,
                  user
                })
              }
            })

        })
      });
    });

  })
})


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //simple Validation
  if (!email || !password) {
    throw res.status(200).json("please enter all fields");
  }
  //Check for existence
  User.findOne({ email }).then(user => {
    if (!user) {
      throw res.status(200).json("User does not exist");

    }
    if (user.acc_status == 2) {
      throw res.status(200).json("Your Account is not activated yet.")

    }
    // Validate password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) throw res.status(200).json("Invalid Credentials")
        delete user.passowrd
        jwt.sign(
          { id: user.id },
          "secret_key",
          { expiresIn: '7d' },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user
            });
          }
        );
      })
  });
});


router.post("/get_user_profile", (req, res) => {

  const { userID } = req.body;

  User.findOne({ _id: userID }).then((user) => {
    delete user.password
    res.status(200).send({ user })

  })

})



router.post("/update_userProfile/general", (req, res) => {

  const {
    Fname,
    Lname,
    country,
    skype,
    userID } = req.body;

  const data = {
    Fname,
    Lname,
    country,
    skype
  }

  User.findOneAndUpdate({ _id: userID }, data).then(user => {
    if (user) {
      res.status(200).json("Updated")
    }
  })



})
router.post("/update_userProfile/billing", (req, res) => {

  const {
    adressLine1,
    adressLine2,
    company,
    country_billing,
    userID } = req.body;

  const data = {
    adressLine1,
    adressLine2,
    company,
    country_billing
  }

  User.findOneAndUpdate({ _id: userID }, data).then(user => {
    if (user) {
      res.status(200).json("Updated")
    }
  })



})


router.post("/update_userProfile/update_password", (req, res) => {


  const { userID, Cpassword, NPassword } = req.body;

  User.findOne({ _id: userID }).then((user) => {

    bcrypt.compare(Cpassword, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(200).json({ errorMsg: "Current Password Didn't Match" })
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(NPassword, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err

            User.findOneAndUpdate({ _id: userID }, {
              $set: {
                password: hash
              }
            }, (err, doc) => {
              if (err) {
              } else {
                request.post({
                  headers: { 'content-type': 'application/json' },
                  url: "https://popexample.herokuapp.com/passwordChanged",
                  json: {
                    email: user.email
                  }
                }, function (error, response, body) {
                })
                res.status(200).json("Your Password Has been Changed.")
              }
            });
          })
        });
      });

  })
})



router.post("/forgot_request", (req, res) => {

  const { email } = req.body;
  User.find({ email }).then(user => {

    if (user) {

      request.post({
        headers: { 'content-type': 'application/json' },
        url: "https://popexample.herokuapp.com/reset_password",
        json: {
          email
        }
      }, function (error, response, body) {
        res.status(200).json(body)
      })
    } else {
      throw res.status(200).json({ errorEmail: "Your Email didn't exist." })
    }
  })

})

let token
router.get('/verifying_token/:token', (req, res) => {
  token = req.params.token
  //  let token = req.body.token
  let decoded = jwt.verify(token, 'emailConfirmation')
  if (decoded.email) {
    User.findOneAndUpdate({ email: decoded.email }, { acc_status: 1 }, (err, doc) => {
      if (!err) {
        res.redirect("/login")
      }
    })
  }

})

let pwResetToken

router.get('/reset/password/:token', (req, res) => {
  pwResetToken = req.params.token
  //  let token = req.body.token
  let decoded = jwt.verify(pwResetToken, 'forgettingPassword')
  if (decoded.email) {
    User.findOne({ email: decoded.email }, (err, doc) => {
      if (!err) {
        res.redirect("/change_password")
      }
    })
  }

})


router.post("/reset_new_password", (req, res) => {
  let decoded = jwt.verify(pwResetToken, 'forgettingPassword')
  const { newPassword } = req.body;

  User.findOne({ email: decoded.email }).then((user) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newPassword, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) throw err

        User.findOneAndUpdate({ email: decoded.email }, {
          $set: {
            password: hash
          }
        }, (err, doc) => {
          if (err) {
          } else {
            request.post({
              headers: { 'content-type': 'application/json' },
              url: "https://popexample.herokuapp.com/passwordChanged",
              json: {
                email: user.email
              }
            }, function (error, response, body) {
            })
            res.status(200).json("Your Password Has been Changed.")
          }
        });
      })
    });


  })

})



module.exports = router