const express=require("express")
const app=express()
const uuid=require("uuid")
const port=3000

app.use(express.json())

const checkId=(request,response,next)=> {
    const {id}=request.params

    const index=person.findIndex(user => user.id === id)

    if(index < 0) {
        return response.status(404).json({error:"Not Found"})
    }

    request.index=index
    request.id=id

    next()
}

const requestMethodUrl=(request,response,next)=> {
    console.log(`${request.method}-${request.url}`)
    next()
}



const person=[]

app.get("/order",(request,response) => {
    return response.json(person)
})

app.post("/order",(request,response)=> {
    const {order,clientName,price}=request.body

    const newOrder={id:uuid.v4(),order,clientName,price,status:"Em preparação"}

    person.push(newOrder)

    return response.status(201).json(newOrder)
})

app.put("/order/:id",checkId,requestMethodUrl,(request,response)=> {
    const id=request.id

    const index=request.index
    
    const {order,clientName,price} =request.body

    const updateUser={id,order,clientName,price,status:"Em preparação"}

    person[index]=updateUser

    return response.json(updateUser)

})

app.delete("/order/:id",checkId,requestMethodUrl,(request,response)=> {
    const index=request.index

    person.splice(index,1)

    return response.status(204).json()
})

app.get("/order/:id",checkId,requestMethodUrl,(request,response)=> {
    const index=request.index
    
    const specificOrder=person[index]

    return response.json(specificOrder)
})

app.patch("/order/:id",checkId,requestMethodUrl,(request,response)=> {

    const index=request.index
    
   person[index].status="Pronto"

   return response.json(person[index])

})















app.listen(port,()=> {
    console.log("Servidor rodando")
})