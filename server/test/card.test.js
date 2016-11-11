'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const expect = chai.expect
const urlApi = 'http://localhost:3000/api'
chai.use(chaiHttp);

const Card = require('../models/card.model')
describe('Route create new kanban', function() {
    let arr = ['to-do', 'doing', 'done']
    let newTitle = faker.lorem.sentence()
    let newContent = faker.lorem.sentences()
    let newDate = faker.date.future()
    let newStatus = arr[Math.ceil(Math.random() * 2)]
    console.log(newStatus);
    let newPerson = faker.name.firstName()
    it('expect to return new kanban details', function(done) {
        chai.request(urlApi)
            .post('/cards')
            .send({
                title: newTitle,
                content: newContent,
                due_date: newDate,
                status: newStatus,
                in_charge: newPerson
            })
            .end(function(req, res) {
                expect(res.body.title).to.be.equal(newTitle)
                expect(res.body.content).to.be.equal(newContent)
                expect(res.body.due_date).to.be.equal(newDate.toISOString())
                expect(res.body.status).to.be.equal(newStatus)
                expect(res.body.in_charge).to.be.equal(newPerson)
                done()
            })
    })
})

describe('Route get all kanbans', function() {
    it('expect to return object', function(done) {
            chai.request(urlApi)
                .get('/cards')
                .end(function(err, res) {
                    expect(typeof(res.body)).to.be.equal('object')
                    done()
                }) // chai
        }) // it
})

describe('Route update new kanban', function() {
    let selected = 4
    let arr = ['to-do', 'doing', 'done']
    let newTitle = faker.lorem.sentence()
    let newContent = faker.lorem.sentences()
    let newDate = faker.date.future()
    let newStatus = arr[Math.ceil(Math.random() * 2)]
    console.log(newStatus);
    let newPerson = faker.name.firstName()
    it('expect to return updated new kanban details', function(done) {
        chai.request(urlApi)
            .put(`/cards/${selected}`)
            .send({
                title: newTitle,
                content: newContent,
                due_date: newDate,
                status: newStatus,
                in_charge: newPerson
            })
            .end(function(req, res) {
                expect(res.body.title).to.be.equal(newTitle)
                expect(res.body.content).to.be.equal(newContent)
                expect(res.body.due_date).to.be.equal(newDate.toISOString())
                expect(res.body.status).to.be.equal(newStatus)
                expect(res.body.in_charge).to.be.equal(newPerson)
                done()
            })
    })
})

describe('Route delete a kanban', function() {
    let selected = 5
    it('expect to return deleted kanban', function(done) {
            chai.request(urlApi)
                .delete(`/cards/${selected}`)
                .end(function(err, res) {
                    expect(res.body.message).to.be.equal('delete successfull')
                    done()
                }) // chai
        }) // it
})
