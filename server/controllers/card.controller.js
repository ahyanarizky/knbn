'use strict'

const Card = require('../models/card.model')

let list = (req, res) => {
    Card
        .find({}, (err, all_card) => {
            if (err) res.status(400).json({ 'error': 'Error: ${err}' })
            if (!all_card) res.status(404).json({ 'message': 'Failed to load all cards' })

            res.status(200).json(all_card)
        })
}

let create = (req, res) => {
    console.log('controller');
    Card.create({
            title: req.body.title,
            content: req.body.content,
            due_date: req.body.due_date,
            status: req.body.status,
            in_charge: req.body.in_charge
        },
        (err, new_card) => {
            console.log(new_card);
            if (err) res.status(400).json({ `error': 'Error: ${err}` })
            if (!new_card) res.status(404).json({ 'message': 'Error to create new card' })
            res.status(200).json(new_card)
        })
}

let find = (req, res) => {
    // method mongoose
    Card.find(req.params.cardID,
        (err, show_a_card) => {
            console.log(show_a_card);
            if (err) res.status(400).json({ 'error': 'Error: ${err}' })
            if (!show_a_card) res.status(404).json({ 'message': 'Error to show a card' })
            res.status(200).json(show_a_card)
        })
}



let update = (req, res) => {
    Card.findOneAndUpdate({
        cardID: req.params.cardID
    }, req.body, {
        new: true
    }, (err, edited_card) => {
        if (err) res.status(400).json({ Error: `${err}` })
        if (!edited_card) res.status(404).json({ 'message': 'Error to edit a card' })
        res.status(200).json(edited_card)
    })
}

let hapus = (req, res) => {
    Card.findOneandRemove({
        cardID: req.params.cardID
    }, (err, delete_card) => {
        if (err) res.status(400).json({ Error: `${err}` })
        if (!delete_card) res.status(404).json({ 'message': 'Error to delete a card' })
        res.status(200).json(delete_card)
    })
}

module.exports = {
    list,
    create,
    find,
    update,
    hapus
}
