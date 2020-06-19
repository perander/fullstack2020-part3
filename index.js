const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        numbeid: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        numbeid: "39-23-6423122",
        id: 4
    }
  ]
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
      const ts = new Date()
      
      res.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${ts}</p>`
        )

  })

  app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const found = (persons.filter(person => person.id === id)) //esimerkissä oli useampi samalla id:llä -> siksi filter() eikä find()
      
      if (found.length > 0) {
        res.json(found)
      } else {
        res.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      persons = (persons.filter(person => person.id !== id)) //sama kuin yllä -> jos monta samalla id:llä, poistetaan kaikki. ei armoa
      res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const body = req.body

    //console.log(body.name);
    

    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return res.status(400).json({ 
        error: 'number missing' 
      })
    }

    const duplicate = persons.find(person => person.name === body.name)

    if (duplicate) {
      return res.status(400).json({ 
        error: `name ${body.name} already exists` 
      })
    }

    const newId = (Math.random() * 10000).toFixed(0)

    const person = {
      name: body.name,
      number: body.number,
      id: Number(newId)
    }

    //console.log(person);
    
    persons = persons.concat(person)

    res.json(person)
    
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })