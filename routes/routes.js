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


//atualiza quantidade do estoque
//req.body.section,
//req.body.name
//req.body.quantity
router.put('/updateQuant', controllerLogin.isAdmin,controllerPart.updateQuantity);

//deleta parte
//req.body.id
router.delete('/deletePart', controllerLogin.isAdmin,controllerPart.deletePart);

//retorna uma lista de partes
//req.body.list==array de ids de parte
router.get('/getPartsByIDList',controllerPart.findPartsbyidList);

//section route, devolopment only
router.post('/registerSection', controllerSection.registerSection);
router.get('/getAllSections', controllerSection.getSections);

//guitar routes
//retorna todas as guitaras
router.get("/getGuitars",controllerGuitar.getAllGuitars);

//adiciona uma guitara
//os atributos aqui são ids de partes
//req.body.body, req.body.neck, req.body.strings, req.body.headstock, req.body.knobs, req.body.pickups
router.post("/addGuitar",controllerGuitar.registerGuitar);

//deleta uma guitara
//req.body.id
router.delete("/deleteGuitar",controllerGuitar.deleteGuitar);

//retorna todas as guitaras craidas pelo usuario logado
router.get("/getMyGuitars",controllerLogin.isLoggedIn,controllerGuitar.myGuitars);

//retorna uma lista de guitarras dado uma lista de ids de guitarras
//req.body.list
router.get("/getGuitarsByIDList",controllerGuitar.findGuitarsbyidList);

//cart routes
//retorna o carrinho do usuario, o carrinho é uma lista de ids de guitarras
router.get("/getCart",controllerLogin.isLoggedIn,controllerCart.getCart);

//adiciona ao carrinho req.body.guitar<id da guitarra
router.post("/addToCart",controllerLogin.isLoggedIn,controllerCart.addToCart);
//deleta do carrinho req.body.guitar<id da guitarra
router.delete("/deleteFromCart",controllerLogin.isLoggedIn,controllerCart.removeFromCart);
//order routes

//retorna todos os pedidos, pedidos sao compostos por um recipiente, lista de guitarras e endereco
router.get("/getOrders",controllerLogin.isAdmin,controllerOrder.getOrders);

//retorna todos os pedidos do usuario logador
router.get("/myOrders",controllerLogin.isLoggedIn,controllerOrder.myOrders);

//adiciona um pedido
//req.session.name,
//req.body.guitars,
//req.session.adress
router.post("/addOrder",controllerLogin.isLoggedIn,controllerOrder.order);

//conclui um pedido
//req.body.id 
router.delete("/concludeOrder",controllerLogin.isAdmin,controllerOrder.concludeOrder);

//cancela um pedido
//req.body.id 
router.delete("/cancelOrder",controllerLogin.isLoggedIn,controllerOrder.removeOrder);

module.exports = router;
