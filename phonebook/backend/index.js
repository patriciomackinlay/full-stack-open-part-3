const e = require("express")
require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
const app = express()
const cors = require("cors")
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token("body", function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/api/persons", (request,response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get("/info", (request, response) => {
    let length = 0
    Person.find({}).then(persons => {
        length = persons.length
    })
    let info = `Phonebook has info for ${length} people`
    let date = new Date()
    response.send(`<p>${info}</p><p>${date}</p>`)
})

app.get("/api/persons/:id", (request,response) => {
    const id = Number(request.params.id)
    const person = Person.findById(id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
  })


app.delete('/api/persons/:id', (request, response) => {
    const body = request.body
    Person.deleteOne({ name:body.name })
})
    

app.post("/api/persons", (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error:"name missing"
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error:"number missing"
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(savedNote => {
        console.log("note saved!")
        response.json(savedNote)
    })


})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log("server running on port ", PORT)
})