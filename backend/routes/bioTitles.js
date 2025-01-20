const express = require("express");
const BioTitle = require("../models/BioTitle");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all bio titles
router.get("/", async (req, res) => {
  try {
    const bioTitles = await BioTitle.find();
    res.json(bioTitles);
  } catch (err) {
    console.error("Error fetching bio titles:", err);
    res.status(500).send("Server error");
  }
});

// Add new bio titles
router.post("/", auth, async (req, res) => {
  const titles = req.body;
  try {
    const newBioTitles = await BioTitle.insertMany(titles);
    res.json(newBioTitles);
  } catch (err) {
    console.error("Error adding bio titles:", err);
    res.status(500).send("Server error");
  }
});

// Edit a bio title
router.put("/:id", auth, async (req, res) => {
  const { title } = req.body;
  try {
    let bioTitle = await BioTitle.findById(req.params.id);
    if (!bioTitle) return res.status(404).json({ msg: "Bio title not found" });

    bioTitle.title = title;
    await bioTitle.save();

    res.json(bioTitle);
  } catch (err) {
    console.error("Error editing bio title:", err);
    res.status(500).send("Server error");
  }
});

// Delete a bio title
router.delete("/:id", auth, async (req, res) => {
  try {
    let bioTitle = await BioTitle.findById(req.params.id);
    if (!bioTitle) return res.status(404).json({ msg: "Bio title not found" });

    await bioTitle.remove();
    res.json({ msg: "Bio title removed" });
  } catch (err) {
    console.error("Error deleting bio title:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
