'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InterpreteSchema = Schema({
	nombre: 	String,
	alias: 		String,
	foto: 		String,
	biografia: 	String
})

module.exports = mongoose.model('Interprete', InterpreteSchema)