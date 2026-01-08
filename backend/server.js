require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGODB_URI =", process.env.MONGODB_URI);

const Contact = require("./models/Contact");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    app.post("/api/contacts", async (req, res) => {
      try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.get("/api/contacts", async (req, res) => {
      try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete("/api/contacts/:id", async (req, res) => {
      try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });