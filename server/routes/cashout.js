let router = require('express').Router()
let Cashout = require('../model/cashout')
let User = require("../model/register")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var short = require('short-uuid');
const Deshboard = require("../model/deshboard")
const request = require('request');


router.post("/request_cashout", async (req, res) => {


  let data = Object.assign({}, req.body)

  let { amount, type, userID } = data

  var decimalTranslator = short("0123456789");
  var uuid = decimalTranslator.new()
  let length = uuid.length
  let newUUID = uuid.slice(length - 8, length)
  User.findOne({ _id: userID }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }
    let cashout = new Cashout({
      amount,
      type,
      userID,
      uuid: newUUID
    })
    Deshboard.findOne({ userID: user._id }).then(assets => {

      if (type == '1') {

        if (assets.available_balance > 0) {
          if (assets.available_balance > parseInt(amount)) {
            let remaining = assets.available_balance - amount
            let pay_out = assets.total_payout + parseFloat(amount)
            Deshboard.findOneAndUpdate({ userID: assets.userID }, { available_balance: remaining, total_payout: pay_out }).then(success => {
              cashout.save().then(cashout => {
                request.post({
                  headers: { 'content-type': 'application/json' },
                  url: "https://popexample.herokuapp.com/cashout",
                  json: {
                    email: user.email,
                    currentAmount: success.available_balance,
                    cashoutAmount: amount,
                  }
                }, function (error, response, body) {
                })
                res.status(200).json({withdraw: cashout})
              })
            })
          } else {
            res.status(200).json("You don't have enough balance")
          }
        } else {
          res.status(200).json("You don't have enough balance")
        }
      }

      if (type == '2') {
        let remaining = assets.available_balance + parseFloat(amount)

        Deshboard.findOneAndUpdate({ userID: assets.userID }, { available_balance: remaining }).then(success => {
          cashout.save().then(cashout => {
            request.post({
              headers: { 'content-type': 'application/json' },
              url: "https://popexample.herokuapp.com/deposit",
              json: {
                email: user.email,
                currentAmount: success.available_balance,
                cashoutAmount: amount,
              }
            }, function (error, response, body) {
            })
            res.status(200).json({deposit: cashout})
          })
        })
      }

    })





  });


})


router.post("/get_all_cashouts", (req, res) => {


  let data = Object.assign({}, req.body)



  let { userID } = data

  Cashout.find({ userID }).then(cashout => {
    res.status(200).json(cashout)
  })

});




module.exports = router