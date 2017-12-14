'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Interprete = require('./models/interprete')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// Retorna todos los interpretes
app.get('/api/interpretes', (req, res) => {
	Interprete.find({}, (err, interpretes) => {
		if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err} `})
		if (!interpretes) return res.status(404).send({message: `No existe el interprete`})

		res.status(200).send({ interpretes })
	})	
})


// Devuelve el objeto que coincida con el ID
app.get('/api/interprete/:id', (req, res) => {
	let inteId = req.params.inteId

	Interprete.findById(inteId, (err, interprete) => {
		if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err} `})
		if (!interprete) return res.status(404).send({message: `No existe el interprete`})

		res.status(200).send({ interprete })
	})
})

// Envia el objeto por POST
app.post('/api/interprete', (req, res) => {
	console.log('POST /api/interprete')
	console.log(req.body)	

	let inte = new Interprete()
	inte.nombre 	= req.body.nombre
	inte.alias 		= req.body.alias
	inte.foto 		= req.body.foto
	inte.biografia 	= req.body.biografia

	inte.save((err, inteStored) => {
	if(err) res.status(500).send({message: `Error al insertar el interprete: ${err} `})	

	res.status(200).send({inte: inteStored})	
	})
})

app.put('/api/interprete/:id', (req, res) => {
	
})

app.delete('/api/interprete/:id', (req, res) => {
	
})

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/pf', { useMongoClient: true }, (err, res) => {
	if(err) throw err
		console.log('Conexion a BDD Mongo establecida')

	app.listen(port, () => {
		console.log(`Hola mundo corriendo en http://localhost:${port}`)
	})
})
