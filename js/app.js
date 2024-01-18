/*imports */

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({msg:'bem vindo a api'})
})

//Models

const User = require('../models/User')

//Register User

app.post('/auth/register', async(req,res) =>{
    const{name, email, password, confirmpassword} = req.body

    //validations

    if(!name){
        return res.status(422).json({msg:'O nome é obrigatório'})
    }

    if(!email){
        return res.status(422).json({msg:'O email é obrigatório'})
    }

    if(!password){
        return res.status(422).json({msg:'A senha é obrigatória'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg:'As senhas não conferem'})
    }

    //check if user exists

    const userExists = await User.findOne({email:email})

    if(userExists){
        return res.status(422).json({msg:'Por favor, utilize outro email!'})
    }

    //create password

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    //create User

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try{

        await user.save()

        res.status(201).json({
            msg:'Usuário Criado com sucesso!'
        })
        
    }catch(error){
        console.log(error)

        res.status(500).json({msg:'Aconteceu um erro no servidor!'
    })
    }
})

//Credencials

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose
.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.qq4luyd.mongodb.net/GymGeek?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(5500)
console.log('conectou ao banco')
})
.catch((err) => console.log(err))

