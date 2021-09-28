const express = require('express')
const app = express()

app.use(express.json())

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})