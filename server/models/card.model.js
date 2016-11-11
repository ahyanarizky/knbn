'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = {
  title : { type : String, required : true},
  content : { type: String, required: true},
  due_date : { type: Date, required: true},
  status : { type: String, required: true},
  in_charge : {type : String, required: true}
}

module.exports = mongoose.model('Card', cardSchema)
