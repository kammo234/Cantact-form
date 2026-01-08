const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
