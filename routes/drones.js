const express = require('express');

// require the Drone model here
const Drone = require('../models/drone-model')
const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((dronesFromDB) => {
      console.log('dronesFromDB', dronesFromDB)
      res.render('drones/list', {
        drones: dronesFromDB
      });
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    let {
      name,
      propellers,
      maxSpeed
    } = req.body
    const newDrone = await Drone.create({
      name,
      propellers,
      maxSpeed
    })
    res.redirect('/drones')
  } catch (error) {
    res.redirect('drones/create-form')
  }
});




router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.id;
  Drone.findById(droneId)
    .then((theDroneFround) => {
      res.render('drones/update-form', {
        drone: theDroneFround
      });
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneId = req.params.id;
  let {
    name,
    propellers,
    maxSpeed
  } = req.body;
  Drone.findByIdAndUpdate(droneId, {
    name,
    propellers,
    maxSpeed
  }).then(() => {
    res.redirect('/drones');
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let droneId = req.params.id;
  Drone.findByIdAndDelete(droneId)
    .then(() => {
      res.redirect('/drones');
    });
});
module.exports = router;