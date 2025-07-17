import express from "express";
import Customer from "../models/Customer";
import {
  cellUpdate,
  formulaUpdate,
  getCellValue,
} from "../controllers/updation.controller";

const express = express();
const router = express.Router();
const Customer = Customer;

router.post("/customers/:customerId/cells/:cellId/value", cellUpdate);

router.post("/customers/:customerId/cells/:cellId/formula", formulaUpdate);

router.get("/customers/:customerId/cells/:cellId", getCellValue);

module.exports = router;
