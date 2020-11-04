let router = require('express').Router()
let Referral = require("../model/referrals")
let User = require("../model/register")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var short = require('short-uuid');
let Statistics = require("../model/statistics")


router.post("/get_my_referrals", (req, res) => {


  let data = Object.assign({}, req.body)

  let { uuid } = data

  if (uuid) {
    Referral.find({ uuid }).count().then(usersNumbers => {
      res.status(200).json(usersNumbers)
    })
  }

})
router.post("/get_referral_list", (req, res) => {


  let data = Object.assign({}, req.body)

  let { uuid } = data

  if (uuid) {

    Referral.find({ uuid: uuid }).then(async userList => {
      let users = []
      let activeUser = []
      let totalImpressions = 0
      for (let index = 0; index < userList.length; index++) {

        await User.find({ _id: userList[index].userID }).then(user => {
          users.push(user[0])
        })

      }
      for (let ind = 0; ind < users.length; ind++) {
        totalImpressions = 0
        await Statistics.find({ user_uuid: users[ind].uuid }).then(stat => {
          if (stat.length > 0) {
            if (typeof stat[0].impressions == "number") {
              for (let i = 0; i < stat.length; i++) {
                totalImpressions += stat[i].impressions


              }
            }
          }
        })
        if (totalImpressions > 10) {
          activeUser.push(users[ind])
        }

      }
      res.status(200).json({ data: activeUser })

    })

  }

})




module.exports = router