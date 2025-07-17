import Customer from "../models/Customer";

export const cellUpdate = async (req, res) => {
  const { customerId, cellId } = req.params;
  const { value } = req.body;

  try {
    let customer = await Customer.findOne({ customerId });

    if (!customer) {
      customer = new Customer({ customerId, cells: [] });
    }

    let cell = customer.cells.find((c) => c.cellId === cellId);

    if (!cell) {
      cell = { cellId };
      customer.cells.push(cell);
    }

    // Remove formula if exists
    cell.formula = undefined;
    cell.value = value;

    await customer.save();

    res.json({
      message: "Cell value updated successfully (formula deleted if existed)",
      customerId,
      cellId,
      value,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const formulaUpdate = async (req, res) => {
  const { customerId, cellId } = req.params;
  const { formula } = req.body;

  try {
    let customer = await Customer.findOne({ customerId });

    if (!customer) {
      customer = new Customer({ customerId, cells: [] });
    }

    let cell = customer.cells.find((c) => c.cellId === cellId);

    if (!cell) {
      cell = { cellId };
      customer.cells.push(cell);
    }

    cell.formula = formula;

    await customer.save();

    res.json({
      message: "Formula updated successfully",
      customerId,
      cellId,
      formula,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getCellValue = async (req, res) => {
  const { customerId, cellId } = req.params;

  try {
    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const cell = customer.cells.find((c) => c.cellId === cellId);

    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }

    res.json({
      customerId,
      cellId,
      value: cell.value || null,
      formula: cell.formula || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
