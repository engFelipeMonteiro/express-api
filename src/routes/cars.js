/* eslint-disable consistent-return */
const express = require('express');
const Usedcar = require('../db/UsedCar');


const router = express.Router();

/* Get all employees */
router.get('/', async (req, res, next) => {
    try {
    const allCars =  await Usedcar.find({});
    console.log(`cars: ${allCars}`);
      res.json(allCars);
    } catch (error) {
      next(error);
    }
  });

/* Delete a specific car */
router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await Usedcar.findOne({
        _id: id,
      });
  
      // car does not exist
      if (!car) {
        return next();
      }
      await Usedcar.remove({
        _id: id,
      });
  
      res.json({
        message: 'Employee has been deleted',
      });
    } catch (error) {
      next(error);
    }
  });

/* Create a new employee */
router.post('/', async (req, res, next) => {
    try {
      const { marca, modelo, ano } = req.body;
      //await Usedcar.validateAsync({ marca, modelo, ano });
  
      /*
      const employee = await Usedcar.findOne({
        name,
      });
  
      // Employee already exists
      if (employee) {
        const error = new Error('Employee already exists');
        res.status(409); // conflict error
        return next(error);
      }
      */
  
      
      // opção 1
      const newcar = new Usedcar(req.body);

      // must be used in instance of Usedcar model
      newcar.save(function (err) {
        if (err) {
            res.status(400);
            return next(err);
        }
        else res.status(201).json(newcar);
        // saved!
      });
      

      
      // opção 2
      // const newcar = await Usedcar.create(req.body)

      // return
      // res.status(201).json(newcar);
    } catch (error) {
      next(error);
    }
    
  });
module.exports = router;