/*imports */

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response

app.use(express.json())


//Open Route - Public Route
app.get('/', (req, res)=>{
    res.status(200).json({msg:'bem vindo a api'})
})

//Private Route

app.get("/user/:id",checkToken, async(req,res) =>{
    const id = req.params.id

    //check if user exists

    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg:'Usuário não encontrado!'})
    }

    res.status(200).json({user})

})

function checkToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:'Acesso megad0!'})
    } try{

        const secret = process.env.SECRET
        jwt.verify(token,secret)

        next()

    }catch(error){
        res.status(400).json({msg:"Token inválido!"})
    }
}

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

//login User

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

//validations

    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' });
    }


    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

  //check password

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!' });
    }

    try {
       
const secret = process.env.SECRET

const token = jwt.sign(
    {
        id: user._id,
    },
    secret,
)

res.status(200).json({msg:'Autentificação realizada com sucesso', token})
        
    } catch (err) {
        console.log(err);

        res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
    }
});


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

