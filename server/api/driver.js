const express = require("express");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Driver = require("../models/Driver");

// @route   GET api/drivers/driverInfo/:quoteId
// @desc    Get Driver
// @access  Private
router.get("/drivers/driverInfo/:quoteId", async (req, res) => {
  try {
    res.json({});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/drivers/driverInfo/:quoteId
// @desc    Create or update a driver
// @access  Private
router.post(
  "/drivers/driverInfo/:quoteId",
  [
    [
      check("currentIns", "Currently Insured is required").not().isEmpty(),
      check("education", "Education is required").not().isEmpty(),
      check("employmentStatus", "Employment Status is required")
        .not()
        .isEmpty(),
      check("gender", "Gender is required").not().isEmpty(),
      check("licensedDt", "License Date is required").not().isEmpty(),
      check("maritalStatus", "Marital Status is required").not().isEmpty(),
      check("name", "Name is required").not().isEmpty(),
      check("quoteId", "QuoteID is required").not().isEmpty(),
      check("licenseNum", "License Number is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      quoteId,
      currentIns,
      employmentStatus,
      gender,
      licensedDt,
      education,
      maritalStatus,
      name,
      licenseNum,
    } = req.body;

    try {
      const driver = new Driver({
        quoteId,
        currentIns,
        employmentStatus,
        gender,
        licensedDt,
        education,
        maritalStatus,
        name,
        licenseNum,
      });

      await driver.save();

      res.json({ quoteId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/drivers/driverInfo/:id?
// @desc    Delete driver by Id
// @access  Private
router.delete("/drivers/driverInfo/:id?", async (req, res) => {
  try {
    res.json({ msg: "Driver deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
