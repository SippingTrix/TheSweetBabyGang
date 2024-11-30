const express = require("express");
const router = express.Router();
const AKTranscript = require("../models/aktranscripts");
const AKTitle = require("../models/aktitles");

router.get("/aktranscripts/meta", async function (req, res, next) {
  try {
    const searchQuery = req.query.query || ""; // Get the search query from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // If there's a search query, create a case-insensitive regular expression
      const searchRegex = new RegExp(searchQuery, "i");
      // Apply the search criteria to the query
      query = {
        $or: [
          { title: { $regex: searchRegex } },
          { transcript: { $regex: searchRegex } },
          { episode: { $regex: searchRegex } }
        ]
      };
    }

    const totalCount = await AKTranscript.countDocuments(query);
    res.json({ totalCount });
    console.log(totalCount);
  } catch (error) {
    next(error);
  }
});

router.get("/aktranscripts", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.query || ""; // Get the search query from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // Split the search query into individual terms or phrases
      const searchTerms = searchQuery.match(/"([^"]+)"|([^"\s]+)/g);

      // Create an array to hold individual search criteria
      const searchCriteria = [];

      // Create a regular expression for each search term or phrase
      searchTerms.forEach((term) => {
        const cleanedTerm = term.replace(/"/g, ""); // Remove quotes if any
        const isExactMatch = term.startsWith('"') && term.endsWith('"');

        if (isExactMatch) {
          // Exact phrase match
          searchCriteria.push({
            $or: [
              { title: { $regex: cleanedTerm, $options: "i" } }, // Exact match for title
              { transcript: { $regex: cleanedTerm, $options: "i" } } // Exact match for transcript
            ]
          });
        } else {
          // Partial match using regular expression
          const searchRegex = new RegExp(cleanedTerm, "i");
          searchCriteria.push({
            $or: [
              { title: { $regex: searchRegex } },
              { transcript: { $regex: searchRegex } }
            ]
          });
        }
      });

      // Combine individual search criteria with AND operator
      query = {
        $and: searchCriteria
      };
    }
    const aktranscripts = await AKTranscript.find(query)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .allowDiskUse(true);

    res.send(aktranscripts);
  } catch (error) {
    next(error);
  }
});

router.get("/aktitles", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.query || ""; // Get the search query from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // If there's a search query, create a case-insensitive regular expression
      const searchRegex = new RegExp(searchQuery, "i");
      // Apply the search criteria to the query
      query = {
        $or: [
          { title: { $regex: searchRegex } },
          { episode: { $regex: searchRegex } }
        ]
      };
    }

    const titles = await AKTitle.find(query)
      .sort({ episode: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.send(titles);
  } catch (error) {
    next(error);
  }
});
router.get("/aktitles/meta", async function (req, res, next) {
  try {
    const searchQuery = req.query.query || ""; // Get the search query from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // If there's a search query, create a case-insensitive regular expression
      const searchRegex = new RegExp(searchQuery, "i");
      // Apply the search criteria to the query
      query = {
        $or: [
          { title: { $regex: searchRegex } },
          { episode: { $regex: searchRegex } }
        ]
      };
    }

    const totalCount = await AKTitle.countDocuments(query);
    console.log("Total Count:", totalCount);

    res.json({ totalCount });
  } catch (error) {
    next(error);
  }
});

router.get("/aktranscripts/:episodeNumber", async function (req, res, next) {
  try {
    const episodeNumber = req.params.episodeNumber;
    const aktranscript = await AKTranscript.findOne({ episode: episodeNumber });

    if (!aktranscript) {
      // Return a 404 status if the episode is not found
      return res.status(404).json({ message: "Episode not found" });
    }

    res.json(aktranscript);
  } catch (error) {
    next(error);
  }
});

router.post("/aktranscripts", async function (req, res, next) {
  try {
    const aktranscripts = await AKTranscript.create(req.body);
    res.send(aktranscripts);
  } catch (error) {
    next(error);
  }
});

router.post("/aktitles", async function (req, res, next) {
  try {
    const aktitles = await AKTitle.create(req.body);
    res.send(aktitles);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
