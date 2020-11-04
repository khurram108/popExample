let router = require('express').Router()
let Website = require("../model/website")
let User = require("../model/register")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var short = require('short-uuid');
const urlMetadata = require('url-metadata')
let Statistics = require("../model/statistics");
const Reports = require('../model/reports');


router.post("/add_new_domain", async (req, res) => {


  let data = Object.assign({}, req.body)

  let { domain_url, domain_category, agree, userID } = data

  var decimalTranslator = short("0123456789");
  var uuid = decimalTranslator.new()
  let length = uuid.length
  let newUUID = uuid.slice(length - 8, length)
  User.findOne({ _id: userID }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }

    let website = new Website({
      domain_url,
      domain_category,
      agree,
      userID,
      uuid: newUUID
    })



    website.save().then(website => {

      res.status(200).json(website)
    })



  });


})


router.post("/get_all_websites", (req, res) => {


  let data = Object.assign({}, req.body)

  let { userID } = data

  Website.find({ userID }).then(websites => {
    res.status(200).json(websites)
  })

});


router.post("/update_website", (req, res) => {


  let data = Object.assign({}, req.body)

  let websiteID = data._id

  Website.findOneAndUpdate({ _id: websiteID }, { status: 2 }).then(websites => {
    res.status(200).json(websites)
  })

});




router.post("/get_user_impression", (req, res) => {


  let data = Object.assign({}, req.body)

  let { country, date, webUuid, by, countryCode } = data
  var decimalTranslator = short("0123456789");
  var uuid = decimalTranslator.new()
  let length = uuid.length
  let newUUID = uuid.slice(length - 8, length)

  let statistics = new Statistics({
    domain_uuid: webUuid,
    date: date,
    user_uuid: by

  })

  let reports = new Reports({
    domain_uuid: webUuid,
    country: country,
    user_uuid: by,
    countryCode: countryCode

  })
  if (by) {

    Statistics.find({ date: date, user_uuid: by, domain_uuid: webUuid }).then(doc => {
      if (doc.length > 0) {
        let revenue = (doc[0].impressions / 1000) * doc[0].eCPM
        Statistics.findOneAndUpdate({ date: date, user_uuid: by }, { impressions: doc[0].impressions + 1, revenue: revenue }).then(update => {

        })
      }
      if (doc.length < 1) {
        statistics.save().then(web => {
        })
      }

      Reports.findOne({ country: country, user_uuid: by, domain_uuid: webUuid }).then(doc => {

        if (doc) {


          let docx = doc
          let revenue = (doc.impressions / 1000) * doc.eCPM
          Reports.findOneAndUpdate({ country: country, user_uuid: by }, { impressions: docx.impressions + 1, revenue: revenue }).then(updated => {
            res.status(200).json("done")
          })

        }
        if (!doc) {

          reports.save().then(report => {

            res.status(200).json("done")
          })
        }
      })
    })


  }




});

router.post("/get_statistics", (req, res) => {


  let data = Object.assign({}, req.body)

  let { user_id } = data

  Statistics.find({ user_uuid: user_id }).then(user => {

    res.status(200).json(user)
  })



});
router.post("/get_statistics_custom_date", (req, res) => {


  let data = Object.assign({}, req.body)

  let { firstDate, secondDate, userID, domain_uuid } = data
  let start = new Date(firstDate)
  let end = new Date(secondDate)

  let startMonth = start.getMonth() + 1
  let endMonth = end.getMonth() + 1
  let startDate = start.getDate()
  let startDay = start.getDay()
  let endDay = end.getDay()
  let endDate = end.getDate()
  let startFullYear = start.getFullYear()
  let endFullYear = end.getFullYear()

  if (domain_uuid !== undefined && domain_uuid !== "Select Website") {
    domain_uuid = parseInt(domain_uuid)

    Statistics.find({
      created_at: {
        $gte: new Date(startFullYear, (startMonth - 1), startDate),
        $lte: new Date(endFullYear, (endMonth - 1), endDate),

      },
      user_uuid: userID,
      domain_uuid: domain_uuid
    }).then(user => {
      res.status(200).json(user)
    })


  }

  if (domain_uuid == undefined || domain_uuid == "Select Website") {


    Statistics.find({
      created_at: {
        $gte: new Date(startFullYear, (startMonth - 1), startDate),
        $lte: new Date(endFullYear, (endMonth - 1), endDate),

      },
      user_uuid: userID
    }).then(user => {
      res.status(200).json(user)
    })

  }
});


router.post("/get_reports", (req, res) => {


  let data = Object.assign({}, req.body)

  let { user_id } = data

  Reports.find({ user_uuid: user_id }).then(user => {

    res.status(200).json(user)
  })



});





module.exports = router