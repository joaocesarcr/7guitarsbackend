const express = require('express');
const router = express.Router();
const controllerLogin = require('../controllers/controllerLogin');
const controllerPart = require('../controllers/controllerPart');
const controllerSection = require('../controllers/controllerSection');
const controllerGuitar = require('../controllers/controllerGuitar');
const controllerCart = require('../controllers/controllerCart');
const controllerOrder = require('../controllers/controllerOrder');
//LOGIN routes
//vou colocar o que precisa no corpo/query de cada request

//Faz login
//req.body.email
//req.body.password
router.post('/login', controllerLogin.login);

//Faz registro
//req.body.name
//req.body.passwprd
//req.body.cpf
//req.body.email
//req.body.adress
//req.body.admin->bool
router.post('/register', controllerLogin.registerUser);

//retorn todos os usuarios
router.get('/all', controllerLogin.allUsers);


//PART routes

//pega todas as partes da sessao section
//req.query.section
router.get('/getPartsOfType', controllerPart.getPartofType);


//Registra nova parte
//req.body.name,
//req.body.quantity,
//req.body.section,
//req.body.price,
//req.body.description
router.post('/registerPart', controllerLogin.isAdmin,controllerPart.registerPart);
router.put('/updateQuant', controllerLogin.isAdmin,controllerPart.updateQuantity);
router.delete('/deletePart', controllerLogin.isAdmin,controllerPart.deletePart);
router.get('/getPartsByIDList',controllerPart.findPartsbyidList);
//section route, devolopment only
router.post('/registerSection', controllerSection.registerSection);
router.get('/getAllSections', controllerSection.getSections);
//guitar routes
router.get("/getGuitars",controllerGuitar.getAllGuitars);
router.post("/addGuitar",controllerGuitar.registerGuitar);
router.delete("/deleteGuitar",controllerGuitar.deleteGuitar);
router.get("/getMyGuitars",controllerLogin.isLoggedIn,controllerGuitar.myGuitars);
router.get("/getGuitarsByIDList",controllerGuitar.findGuitarsbyidList);
//cart routes
router.get("/getCart",controllerLogin.isLoggedIn,controllerCart.getCart);
router.post("/addToCart",controllerLogin.isLoggedIn,controllerCart.addToCart);
router.delete("/deleteFromCart",controllerLogin.isLoggedIn,controllerCart.removeFromCart);
//order routes
router.get("/getOrders",controllerLogin.isAdmin,controllerOrder.getOrders);
router.get("/myOrders",controllerLogin.isLoggedIn,controllerOrder.myOrders);
router.post("/addOrder",controllerLogin.isLoggedIn,controllerOrder.order);
router.delete("/concludeOrder",controllerLogin.isAdmin,controllerOrder.concludeOrder);
router.delete("/cancelOrder",controllerLogin.isLoggedIn,controllerOrder.removeOrder);

module.exports = router;
