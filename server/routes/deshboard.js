let router = require('express').Router()
let Deshboard = require('../model/deshboard')
let User = require("../model/register")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



router.post("/save_earning", async (req, res) => {


  let data = Object.assign({}, req.body)

  let { referral_earning, available_balance, total_payout ,userID } = data


  User.findOne({ _id: userID }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }

    let earningStatus = new Deshboard({
      referral_earning,
      available_balance,
      userID,
      total_payout
    })

    earningStatus.save().then(earning => {
      res.status(200).json(earning)
    })
  });


})


router.post("/get_all_earnings", (req, res) => {


  let data = Object.assign({}, req.body)

  let { userID } = data




  Deshboard.find({ userID }).then(earning => {
    res.status(200).json(earning)
  })

});




module.exports = router