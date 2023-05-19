const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const path = require('path')
const Particle = require('../../models/Particle');
const { spawn } = require('child_process');

// @route  POST api/particle
// @desc   Create dimensions for a quantum particle
//@access  Private 
router.post(
  '/',
  [
    // Validation middleware using express-validator
    body('particleName', 'Particle name is required').notEmpty(),
    body('position', 'Position must be an array of numbers').notEmpty(),
    body('momentum', 'Momentum must be an array of numbers').notEmpty(),
    body('spin', 'Spin must be a number').isNumeric(),
    body('description', 'Description must be a string')
      .optional()
      .isString(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new Particle instance
      const newParticle = new Particle({
        user: req.params.id,
        particleName: req.body.particleName,
        position: req.body.position,
        momentum: req.body.momentum,
        spin: req.body.spin,
        description: req.body.description,
      });

      // Save the Particle instance to the database
      await newParticle.save();

      res.status(201).json(newParticle); // Return the newly created Particle
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/particle/run-python-script/:scriptName
// @desc   This alows a python script to execute
//@access  Private
router.get('/run-python-script/:scriptName', async (req, res) => {
  try {

    const { scriptName } = req.params;
    // Execute the Python script
    const pythonScript = path.join(__dirname, `../../../scripts/${scriptName}.py`);

    const process = spawn('python3', [pythonScript]);

    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error('Error from Python script:', data.toString());
    });

    process.on('exit', async (code) => {
      console.log('Python script exited with code', code);

      // Perform any necessary actions with the output
      // For example, you can save it to the database or return it in the response

      res.status(200).json({ output }); // Return the output in the response
    });

    process.on('error', (err) => {
      console.error('Error executing Python script:', err);
      res.status(500).send('Error executing Python script');
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
