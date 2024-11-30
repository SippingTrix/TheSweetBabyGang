import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Chip,
  Grid,
  Button,
  Select,
  MenuItem
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import SearchHelp from "../searchHelp";

const useStyles = makeStyles((theme) => ({
  episodeText: {
    color: "#cb767d"
  },
  responsiveText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem"
    }
  },
  responsiveButton: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem"
    }
  },
  responsiveCard: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1)
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2)
    }
  }
}));

const TranscriptCard = () => {
  const [transcript, setTranscript] = useState([]);
  const [title, setTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedDialogCardId, setExpandedDialogCardId] = useState(null);
  const [expandedTranscript, setExpandedTranscript] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const itemsPerPage = 200;
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const classes = useStyles();

  const [searchInputs, setSearchInputs] = useState([]);
  const [typingSearchInput, setTypingSearchInput] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      if (!isSearchActive) {
        const params = { page: currentPage };
        if (selectedCategory) {
          params.category = selectedCategory;
        }
        const titlesResponse = await axios.get(
          "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/canceltitles",
          { params }
        );
        setTitles(titlesResponse.data);

        const response = await axios.get(
          "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/cancelled",
          {
            params
          }
        );
        const sortedTranscript = response.data.sort(
          (a, b) => a.episode - b.episode
        );

        setTranscript(sortedTranscript);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, [currentPage, searchInputs, selectedCategory]);

  const fetchMetadata = async () => {
    try {
      const params = { query: searchQuery, category: selectedCategory }; // Include selected category in the query params
      const response = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/dc/meta",
        {
          params
        }
      );
      const totalCount = response.data.totalCount;
      setTotalItems(totalCount);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, [selectedCategory]);

  const fetchTitleMetadata = async () => {
    try {
      const metaResponse = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/canceltitles/meta"
      );
      const totalCount = metaResponse.data.totalCount;
      setTotalItems(totalCount);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  useEffect(() => {
    fetchTitleMetadata();
  }, []);

  const fetchTranscript = async (episodeNumber) => {
    try {
      const response = await axios.get(
        `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/cancelled/${episodeNumber}`
      );
      const transcriptItem = response.data;

      setExpandedTranscript(transcriptItem.context);
      setExpandedDialogCardId(transcriptItem._id);
      setCurrentEpisodeTitle(
        `Context for Episode Cancellations ${transcriptItem.episode}`
      );
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory); // Update selected category state

    try {
      // Make a request to fetch metadata based on the selected category
      const response = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/dc/meta",
        {
          params: {
            query: searchQuery, // Pass the existing search query
            category: selectedCategory // Pass the selected category as a query parameter
          }
        }
      );
      const totalCount = response.data.totalCount;
      console.log("Total items after category change:", totalCount); // Debugging
      setTotalItems(totalCount); // Update total items state
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchInputs((prevInputs) => [...prevInputs, typingSearchInput]);
    setIsSearchActive(true);

    try {
      const searchTerms = [...searchInputs, typingSearchInput].map(
        (term) => `"${term}"`
      );
      const searchQuery = searchTerms.join(" ");

      const response = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/cancelled",
        {
          params: {
            query: searchQuery,
            category: selectedCategory
          }
        }
      );

      const searchResults = response.data;

      setTotalItems(searchResults.length);
      setTranscript(searchResults);
      setTitles(searchResults);
      console.log("Search Results:", searchResults);
      console.log("Updated Transcript State:", transcript);
      console.log("updated titles", title);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const clearSearch = () => {
    setSearchInputs([]);
    setTypingSearchInput("");
    setIsSearchActive(false);
    setSearchQuery("");
    fetchData();
    fetchMetadata();
    fetchTitleMetadata();
  };

  const handleTypingSearch = (e) => {
    setTypingSearchInput(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/cancelled?page=${pageNumber}`);
  };

  const highlightText = (text) => {
    const regex = new RegExp(typingSearchInput, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow">${match}</span>`
    );
  };

  const openTranscriptDialog = (episodeNumber) => {
    const transcriptItem = transcript.find(
      (item) => item.episode === episodeNumber
    );

    if (transcriptItem) {
      setExpandedTranscript(transcriptItem.context);
      setExpandedDialogCardId(transcriptItem._id);
      setCurrentEpisodeTitle(
        `Transcript for Episode ${transcriptItem.episode}`
      );
      setIsDialogOpen(true);
    } else {
      fetchTranscript(episodeNumber);
    }
  };

  const toggleCardExpansion = (cardId) => {
    if (cardId === expandedCardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(cardId);
    }
  };

  const filteredTitle = title.filter((titleItem) => {
    const matchesSearch = searchQuery
      ? titleItem.cancelled.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? titleItem.Category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Box marginTop={2} marginBottom={2}>
        <SearchHelp />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
        marginBottom={2}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className={classes.responsiveButton}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <form
          onSubmit={handleSearchSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "500px"
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={typingSearchInput}
            onChange={handleTypingSearch}
            fullWidth
            margin="normal"
            className={classes.responsiveText}
          />
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.responsiveText}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            marginTop={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginRight: 8 }}
              className={classes.responsiveButton}
            >
              Search
            </Button>
            <Button
              onClick={clearSearch}
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.responsiveButton}
            >
              Clear Search
            </Button>
          </Box>
        </form>
      </Box>

      {isSearchActive && (
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {searchInputs.map((input, index) => (
            <Chip
              key={index}
              label={input}
              size="small"
              variant="outlined"
              style={{ marginLeft: 8 }}
            />
          ))}
        </Box>
      )}

      <Grid container spacing={2}>
        {filteredTitle.map((titleItem) => (
          <Grid item xs={12} sm={6} key={titleItem._id}>
            <Card className={classes.responsiveCard}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.responsiveText}
                  >
                    {titleItem.cancelled}
                  </Typography>
                  <Button
                    onClick={() => openTranscriptDialog(titleItem.episode)}
                    className={classes.responsiveButton}
                  >
                    Open
                  </Button>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  <span className={classes.episodeText}>Episode:</span>{" "}
                  {titleItem.episode}
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: "25px" }}
                >
                  <span className={classes.episodeText}>Category: </span>
                  <Chip
                    label={titleItem.Category}
                    size="small"
                    variant="outlined"
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="lg"
      >
        <DialogTitle className={classes.responsiveText}>
          {currentEpisodeTitle}
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            component="p"
            dangerouslySetInnerHTML={{
              __html: highlightText(expandedTranscript)
            }}
            className={classes.responsiveText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpen(false)}
            color="primary"
            className={classes.responsiveButton}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TranscriptCard;
