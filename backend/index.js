
const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())









let persons = [
    {
        "id": 1,
        "name": "Arto Hello",
        "number": "040-123456"
    },

    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
        
    },

    {
        "id": 3,
       "name": "Mary Poppendieck",
       "number": "39-6423122"
    }
]

app.get('/api/persons/', (request,response)=>{
    
    response.json(persons)
})




app.get('/api/persons/:id', (request,response)=>{
    const id = Number (request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response)=>{
    const id = Number (request.params.id)
    person = persons.filter(person => person.id !== id)

    response.status(204).end()

})

app.get('/api/info', (request,response)=> {
    const currentDate = new Date().toLocaleDateString();
   const timeZone = Int1.DateTimeFormat().resolvedOptions().timeZone
    persons.find({}).then(persons => {
       response.send(
            



         `   <div>
                <p>phonebook has info for ${persons.length} people</p>

            </div>

           <div>
             <p>${currentDate} (${timeZone})</p>

           </div>`
            

        
        )
    })
})










app.post('/api/persons', (request,respond) =>{
   const maxId = persons.length > 0
   ? Math.max(...persons.map(p => p.id))
   :0

   const person = request.body
   person.id = maxId + 1

   persons= persons.concat(person)

   respond.json(persons)


})

const errorHandler = (error , request , response , next) =>{
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(404).send({error:'malformatted name'})

    }else if (error.name === 'ValidattionError') {
        return response.status(400).json({error:error.message})
    }

    next(error)
};


const PORT = 3001
app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
})