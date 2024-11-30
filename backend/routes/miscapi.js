const express = require("express");
const router = express.Router();
const BackstageTranscript = require("../models/backstageModel");
const BackstageTitle = require("../models/backstageTitleModel");
const Book = require("../models/bookModel");

const ITEMS_PER_PAGE = 200; // Adjust the number of items per page as needed

router.get("/backstagetitles", async function (req, res, next) {
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

    const backstagetitles = await BackstageTitle.find(query)
      .sort({ episode: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.send(backstagetitles);
  } catch (error) {
    next(error);
  }
});

router.get("/backstagetranscripts", async function (req, res, next) {
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

    const backstagetranscripts = await BackstageTranscript.find(query)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .allowDiskUse(true);

    res.send(backstagetranscripts);
  } catch (error) {
    next(error);
  }
});

router.get("/backstagetranscripts/meta", async function (req, res, next) {
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

    const totalCount = await BackstageTranscript.countDocuments(query);
    res.json({ totalCount });
    console.log(totalCount);
  } catch (error) {
    next(error);
  }
});

router.post("/backstagetranscripts", async function (req, res, next) {
  try {
    const backstagetranscripts = await BackstageTranscript.create(req.body);
    res.send(backstagetranscripts);
  } catch (error) {
    next(error);
  }
});

router.get("/backstagetitles/meta", async function (req, res, next) {
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

    const totalCount = await BackstageTitle.countDocuments(query);
    console.log("Total Count:", totalCount);

    res.json({ totalCount });
  } catch (error) {
    next(error);
  }
});

router.post("/backstagetitles", async function (req, res, next) {
  try {
    const backstagetitles = await BackstageTitle.create(req.body);
    res.send(backstagetitles);
  } catch (error) {
    next(error);
  }
});

router.post("/books", async function (req, res, next) {
  try {
    const books = await Book.create(req.body);
    res.send(books);
  } catch (error) {
    next(error);
  }
});

router.get("/books", async function (req, res, next) {
  try {
    const books = await Book.find().sort({ episode: -1 }); // Sort by author in ascending order
    res.send(books);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/backstagetranscripts/:episodeNumber",
  async function (req, res, next) {
    try {
      const episodeNumber = req.params.episodeNumber;
      const backstagetranscripts = await BackstageTranscript.findOne({
        episode: episodeNumber
      });

      if (!backstagetranscripts) {
        // Return a 404 status if the episode is not found
        return res.status(404).json({ message: "Episode not found" });
      }

      res.json(backstagetranscripts);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
