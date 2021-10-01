const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
            ].join(' ')
    } else {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            ].join(' ')
    }
  }))

let persons = [
    {
      id: Math.floor(Math.random() * 999999),
      name: "Matias Tonttu",
      number: "0440 39 70 66"
    },
    {
        id: Math.floor(Math.random() * 999999),
        name: "Leena Tonttu",
        number: "0440 39 70 77"
      },
  ]

app.get('/info', (req, res) => {
    const returnData = `<div>Phonebook has info for ${persons.length} people <br/> ${new Date()} </div>`
    res.send(returnData)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        });
    };

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        });
    };

    if (persons.find(i => i.name === body.name)) {
        return response.status(400).json({
            error: 'name is already in the phonebook'
        });
    };

    const person = {
        id: Math.floor(Math.random() * 999999),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})