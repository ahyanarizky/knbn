'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema

const cardSchema = new Schema({
    cardID: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    due_date: { type: Date, required: true },
    status: { type: String, required: true },
    in_charge: { type: String, required: true }
})

cardSchema.plugin(AutoIncrement, { inc_field: 'cardID' });

module.exports = mongoose.model('Card', cardSchema)
