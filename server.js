const express = require('express')
const app = express()
app.use(express.json())

// class Empresa{

//     id = null
//     nome = null

//     constructor(id, nome){
//         this.id = id
//         this.nome = nome
//     }

//     validarEmpresa(empresa){
//         return ("nome" in empresa)
//     }
// }

const empresas = []

erros = [{ 
    "erro": true, 
    "mensagem":"Identificador não informado!" 
},
{ 
    "erro": true, 
    "mensagem":" Todos os campos obrigatórios devem ser preenchidos! " 
},
{ 
    "erro": false, 
    "mensagem": " Usuário excluído com sucesso! " 
}]

app.get("/empresas",(req,res)=>{
    res.status(200).send(empresas)
})

app.get("/empresas/:id", (req,res)=>{
    const { id } = req.params
    const index = id - 1

    if (id > empresas.length){
        res.status(400).send(erros[0])
        return
    }

    res.status(200).send(empresas[index])

})

app.post("/empresas", (req,res)=>{
    const empresa = req.body
    index = (empresas.length) - 1
    const ultimaId = empresas[index] ? (empresas[index].id) : 0
    empresa.id = ultimaId + 1
    
    if ("nome" in empresa){
        empresas.push(empresa)
        res.status(201).send(empresa)
    }
    
    return res.status(400).send(erros[1])
})

app.patch("/empresas/:id", (req, res)=>{
    empresa = req.body
    const { id } = req.params
    const index = id - 1
    empresa.id = index + 1 
    
    if ("nome" in empresa){
        empresas[index] = empresa
        res.status(200).send(empresa)
    }

    res.status(400).send(erros[1])
    
})

app.delete("/empresas/:id", (req, res)=>{
    const { id } = req.params
    const index = id - 1

    if (id > empresas.length) {
        res.status(400).send(erros[0])
        return
    }

    empresas.splice(index,1)
    res.status(200).send(erros[2])
    var i = 0
    while(i < empresas.length){
        empresas[i].id = (i+1)
        i++
    }

})

app.listen(3000)