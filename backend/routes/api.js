const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const Cancelled = require("../models/cancelledModel");
const Transcript = require("../models/transcriptModel");
const Title = require("../models/titleModel");

const cancelTitle = require("../models/canceltitleModel");

const ITEMS_PER_PAGE = 200; // Adjust the number of items per page as needed

router.get("/titles", async function (req, res, next) {
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

    const titles = await Title.find(query)
      .sort({ episode: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.send(titles);
  } catch (error) {
    next(error);
  }
});

router.get("/posts", async function (req, res, next) {
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

    const posts = await Post.find(query)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .allowDiskUse(true);

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/posts/meta", async function (req, res, next) {
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

    const totalCount = await Post.countDocuments(query);
    res.json({ totalCount });
    console.log(totalCount);
  } catch (error) {
    next(error);
  }
});

router.get("/posts/:episodeNumber", async function (req, res, next) {
  try {
    const episodeNumber = req.params.episodeNumber;
    const post = await Post.findOne({ episode: episodeNumber });

    if (!post) {
      // Return a 404 status if the episode is not found
      return res.status(404).json({ message: "Episode not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/posts", async function (req, res, next) {
  try {
    const posts = await Post.create(req.body);
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/titles", async function (req, res, next) {
  try {
    const titles = await Title.create(req.body);
    res.send(titles);
  } catch (error) {
    next(error);
  }
});

router.post("/canceltitles", async function (req, res, next) {
  try {
    const canceltitles = await cancelTitle.create(req.body);
    res.send(canceltitles);
  } catch (error) {
    next(error);
  }
});

router.get("/titles/meta", async function (req, res, next) {
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

    const totalCount = await Title.countDocuments(query);
    console.log("Total Count:", totalCount);

    res.json({ totalCount });
  } catch (error) {
    next(error);
  }
});

router.get("/cancelled", async function (req, res, next) {
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
              { cancelled: { $regex: cleanedTerm, $options: "i" } }, // Exact match for title
              { context: { $regex: cleanedTerm, $options: "i" } } // Exact match for transcript
            ]
          });
        } else {
          // Partial match using regular expression
          const searchRegex = new RegExp(cleanedTerm, "i");
          searchCriteria.push({
            $or: [
              { cancelled: { $regex: searchRegex } },
              { context: { $regex: searchRegex } }
            ]
          });
        }
      });

      // Combine individual search criteria with AND operator
      query = {
        $and: searchCriteria
      };
    }

    const cancel = await Cancelled.find(query)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .allowDiskUse(true);

    res.send(cancel);
  } catch (error) {
    next(error);
  }
});

router.get("/cancelled/:episodeNumber", async function (req, res, next) {
  try {
    const episodeNumber = req.params.episodeNumber;
    const cancel = await Cancelled.findOne({ episode: episodeNumber });

    if (!cancel) {
      // Return a 404 status if the episode is not found
      return res.status(404).json({ message: "Episode not found" });
    }

    res.json(cancel);
  } catch (error) {
    next(error);
  }
});

router.get("/categories", async function (req, res, next) {
  try {
    const uniqueCategories = await cancelTitle.distinct("Category");
    res.send(uniqueCategories);
  } catch (error) {
    next(error);
  }
});

router.get("/canceltitles", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.query || ""; // Get the search query from the request
    const category = req.query.category || ""; // Get the category from the request

    let query = {}; // Default to an empty query

    if (searchQuery && category) {
      // If there's both a search query and category, create a case-insensitive regular expression for each
      const searchRegex = new RegExp(searchQuery, "i");
      const categoryRegex = new RegExp(category, "i");

      // Construct the query to include both search criteria
      query = {
        $and: [
          { cancelled: { $regex: searchRegex } },
          { Category: { $regex: categoryRegex } }
        ]
      };
    } else if (searchQuery) {
      // If there's only a search query, construct the query for the cancelled field
      query = { cancelled: { $regex: new RegExp(searchQuery, "i") } };
    } else if (category) {
      // If there's only a category, construct the query for the Category field
      query = { Category: { $regex: new RegExp(category, "i") } };
    }

    const canceltitles = await cancelTitle
      .find(query)
      .sort({ episode: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.send(canceltitles);
  } catch (error) {
    next(error);
  }
});

router.get("/canceltitles/meta", async function (req, res, next) {
  try {
    const searchQuery = req.query.query || ""; // Get the search query from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // If there's a search query, create a case-insensitive regular expression
      const searchRegex = new RegExp(searchQuery, "i");
      // Apply the search criteria to the query
      query = {
        $or: [
          { cancelled: { $regex: searchRegex } },
          { episode: { $regex: searchRegex } }
        ]
      };
    }

    const totalCount = await cancelTitle.countDocuments(query);
    console.log("Total Count:", totalCount);

    res.json({ totalCount });
  } catch (error) {
    next(error);
  }
});

router.get("/dc/meta", async function (req, res, next) {
  try {
    const searchQuery = req.query.query || ""; // Get the search query from the request
    const category = req.query.category || ""; // Get the category parameter from the request

    let query = {}; // Default to an empty query

    if (searchQuery) {
      // If there's a search query, create a case-insensitive regular expression
      const searchRegex = new RegExp(searchQuery, "i");
      // Apply the search criteria to the query
      query = {
        $or: [
          { cancelled: { $regex: searchRegex } },
          { context: { $regex: searchRegex } },
          { Category: { $regex: searchRegex } },
          { episode: { $regex: searchRegex } }
        ]
      };
    }

    // If a category parameter is provided, add it to the query
    if (category) {
      query.Category = category;
    }

    const totalCount = await Cancelled.countDocuments(query);
    res.json({ totalCount });
  } catch (error) {
    next(error);
  }
});

// router.get("/cancelled/:category", async function (req, res, next) {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const searchQuery = req.query.query || ""; // Get the search query from the request
//     const category = req.params.category || ""; // Get the category parameter from the URL

//     let query = { Category: category }; // Default to the specified category

//     if (searchQuery) {
//       // If there's a search query, create a case-insensitive regular expression
//       const searchRegex = new RegExp(searchQuery, "i");
//       // Apply the search criteria to the query
//       query.$or = [
//         { context: { $regex: searchRegex } },
//         { cancelled: { $regex: searchRegex } },
//         { episode: { $regex: searchRegex } }
//       ];
//     }

//     const cancel = await Cancelled.find(query)
//       .sort({ episode: -1 }) // Sort by the "episode" field in ascending order
//       .skip((page - 1) * ITEMS_PER_PAGE)
//       .limit(ITEMS_PER_PAGE);

//     res.send(cancel);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/cancelled", async function (req, res, next) {
  try {
    const cancel = await Cancelled.create(req.body);
    res.send(cancel);
  } catch (error) {
    next(error);
  }
});

router.post("/transcripts", async function (req, res, next) {
  try {
    const transcript = await Transcript.create(req.body);
    res.send(transcript);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
