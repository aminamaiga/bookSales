const express = require('express');
const app     = express();
const router = express.Router();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//body-parse pass:1
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//multer pour upload file
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')//route qui contient l'immage pour upload
    },
    filename: function (req, file, cb) {//filename uploaded, Date() pour éviter que 2 fichier ayent le meme nom
        cb(null, Date.now() + "-" + file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter:  function(req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || 
           file.mimetype=="image/png" ||
           file.mimetype=="image/jpg" ||
           file.mimetype=="image/jpeg"||
           file.mimetype=="image/gif"){ //verifier si le type de fichier est bien une image
            cb(null, true)
        }else{
            return cb(new Error('Seulement images autorissée! '))
        }
    }
}).single("image");

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";
const dbName = "onlinebooksales";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db(dbName);
    
    /* Liste des books */
    app.get("/books", (req,res) => {
        console.log("/books");
        try {
            db.collection("books").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /books : " + e);
              res.end(JSON.stringify([]));
        }
    });

    /**Enregistrer un book */
    app.post("/books", function(req, res){
        //Upload Image
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                console.log("Multer error while uploading ");
                res.json({result:0, "err": err});
            } else if(err){
                console.log("Unknown error while uploading ");
                res.json({result:0, "err": err});
            } else {
                console.log("Upload successfully");
                console.log(req.file);
                res.json({result:1});
                //File information apres upload
                //Sauvegarder livre
                var book = {
                    name : req.body.name, 
                    photo: req.file.filename, 
                    quantite: req.body.quantite,
                    type: req.body.type,
                    price: req.body.price,
                    is_promo: req.body.is_promo
                 };
                 db.collection("books").insertOne(book);
                res.end({result:1, "book" : book});
        }});
    });
    /* Liste des books suivant une catégorie */
    app.get("/books/:categorie", (req,res) => {
	let categorie = req.params.categorie;
        console.log("/books/"+categorie);
        try {
            db.collection("books").find({type: categorie}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /books/"+categorie+" : "+ e);
            res.end(JSON.stringify([]));
        }
    });
    
    /* Liste des catégories de books */
    app.get("/categories", (req,res) => {
        categories = [];
        try {
            db.collection("category").find().toArray((err, documents) => {
                categories = JSON.parse(JSON.stringify(documents));
                res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Connexion */
    app.post("/connexion", (req,res) => {
        try {
            console.log(req.body);
            db.collection("utilisateurs")
            .find({$and: [{"login": req.body.login}, {"password": req.body.password}]})
            .toArray((err, documents) => {
                if (documents != undefined && documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie", "data": documents[0]}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Login et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
// liste des users
    app.get("/users", (req,res) => {
        console.log("/utilisateurs");
        try {
            db.collection("utilisateurs").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /users : " + e);
              res.end(JSON.stringify([]));
        }
    });
     //find one book
     app.get("/books/find/:id", (req,res) => {
        let id = req.params.id;
        try {
            db.collection("books").findOne({"_id": new ObjectID(id)}, (err, documents) => {
            if(documents)
                res.end(JSON.stringify(documents));
             else
             res.end();   
            });
        } catch(e) {
            console.log("Erreur sur /books : " + e);
              res.end(JSON.stringify({}));
        }
    });
    
   /**create user */
   app.post("/users", (req,res) => {
    try {
        if(req.body.login == undefined || req.body.confirm == undefined || req.body.password == undefined || req.body.nom == undefined || req.body.prenom == undefined ){
            res.end(JSON.stringify({"resultat": 0, "message": "Tous les champs sont obligatoires"}));
        } else {
                if(req.body.confirm != req.body.password){
                  res.end(JSON.stringify({"resultat": 0, "message": "mots de passe non identiques"})); 
                 } else {
                     db.collection("utilisateurs").find({"login": req.body.login}).toArray((err, documents) => {
                      if (documents != undefined && documents.length >= 1)
                        res.end(JSON.stringify({"resultat": 0, "message": "Cet utilisateur existe deja"})); 
                     else {
                         var user = {
                           prenom: req.body.prenom,
                           nom: req.body.nom,
                           password: req.body.password,
                           login: req.body.login
                           };
                           db.collection("utilisateurs")
                          .insertOne(user);
                           res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussie"}));            
                    }
                });
             } 
            }
    } catch (e) {
        res.end(JSON.stringify({"resultat": 0, "message": e, "err": "Veuillez de remplir tous les champs obligatoires"}));
    }
});

//cart insert
app.post("/carts", (req,res) => {
    let result;
    try {
        let orders= [];
        db.collection("carts").findOne({"user_id": new ObjectID(req.body.user_id)}, (err, documents) => {
            if(documents){
                 result = documents.orders.map(o =>{
                  if(o.book_id == req.body.order.book_id){
                    return {quantite: (o.quantite + req.body.order.quantite), book_id: o.book_id}
                  }
                });
                let documentsId = documents['_id'];
               db.collection("carts").update(
                { _id: documentsId },
                  {
                    $set: {
                        "orders": result
                    }
                }
                );
                res.end(JSON.stringify({"resultat": 1, "message": "Le livre a été ajouté dans ton panier", "data": documents}));  
             } else {
                orders.push(req.body.order);
                db.collection("carts").insertOne(
                    {
                        user_id: new ObjectID(req.body.user_id),
                        orders:  orders
                    });
                 res.end(JSON.stringify({"resultat": 1, "message": "Le livre a été ajouté dans ton panier"}));
             }  
        });
     }catch(e) {
        console.log("Erreur sur /carts add : " + e);
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }
});
});

app.listen(4300);
