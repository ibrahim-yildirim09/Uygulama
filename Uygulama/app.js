const express = require('express');
const app = express();
app.use(express.json());

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const databaseURL = 'mongodb://localhost:27017';
const databaseName = 'app1';

MongoClient.connect(databaseURL, {useUnifiedTopology: true, useNewUrlParser:true}, (error, result) => {
    if(error){
        return console.log("db'ye bağlanılamadı" + error)
    }
    console.log("db'ye bağlanıldı")
    const db = result.db(databaseName)

    db.collection('users').insertOne({
        ad: "ibo",
        yas:22,
        sonbaharMi: true
    }, (error,sonuc) => {
        if(error){
            console.log("Veri eklenemedi"+ error)
        }else {
            console.log(sonuc.ops, sonuc.insertedCount);
        }
    });

    db.collection('users').insertOne({
        ad: 'enes',
        yas: 22
    }).then(sonuc => {
        console.log(sonuc.ops, "Promise basarili")
    }).catch(hata => {
          console.log(hata, "Promise hata")
      })

});

const users = [
    { id:1,ad: 'Ibrahim',yas: 22},
    { id:2,ad: 'Enes',yas: 22},
    { id:3,ad: 'Max',yas: 22},
    { id:4,ad: 'Adam',yas: 22},
]

app.get('/', (req,res) => {
    console.log("ana sayfa");
    res.send("Hello from index");
});

app.get('/user', (req,res) => {
    console.log(req.query)
    if(req.query.ters){
        res.send(users.reverse());
    }else {
        res.send(users)
    }
});

app.get('/user/:id', (req,res) => {
    const findingUser = users.find(user => user.id === parseInt(req.params.id));
    if(findingUser){
        res.send(findingUser)
    }else {
        res.status(404).send(req.params.id + " id'li kullanıcı bulunamadı")
    }
})

app.post('/user', (req, res) => {
    const newUsers = {
        id: users.length + 1,
        ad: req.body.ad,
        yas: req.body.yas
    }
    users.push(newUsers);
    res.send(newUsers);
})

app.listen(3000, () => {
    console.log("server 3000 portuyla dinlemede");
});