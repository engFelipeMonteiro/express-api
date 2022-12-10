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

// register and login
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const User = require("../db/user");
const bcrypt = require("bcrypt");

router.post('/login', async (req, res, next) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(`${password}`)
    console.log(`${await bcrypt.hash(password, 10)}`)
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;