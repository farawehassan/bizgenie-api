const express = require('express');
const supplyController = require('../controller/supply-controller');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

// Fetch all available products from the database
router.get('/fetchAllSupplies', isAuth, supplyController.fetchSupplies);

// Fetch a particular product from the database
router.get('/fetchSupply/:id', isAuth, supplyController.findSupply);

// Add new product to the database
router.post('/addNormalSupply', isAuth, supplyController.addNewNormalSupply);

// Add new product to the database
router.post('/addFOCSupply', isAuth, supplyController.addNewFOCSupply);

// Update a product's details in the database
router.put('/editSupply', isAuth, supplyController.updateSupply);

// Update a product's details in the database
// when a product is sold
router.put('/receivedSupply', isAuth, supplyController.receivedSupply);

// Delete a product from the database 
router.delete('/deleteSupply/:id', isAuth, supplyController.deleteSupply);  

module.exports = router;