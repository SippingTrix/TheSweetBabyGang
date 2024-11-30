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
  IconButton
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
  const itemsPerPage = 200;
  const [totalItems, setTotalItems] = useState(1);
  const navigate = useNavigate(); // Add this line to get the navigate function
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(totalItems);

  const [searchInputs, setSearchInputs] = useState([]);
  const [typingSearchInput, setTypingSearchInput] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredTitle = title.filter((titleItem) =>
    titleItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = async () => {
    try {
      // Fetch titles and episodes
      const titlesResponse = await axios.get(
        `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/titles?page=${currentPage}`
      );
      setTitles(titlesResponse.data);

      const encodedSearchInputs = searchInputs.map((input) =>
        encodeURIComponent(`"${input}"`)
      );
      const endpoint = isSearchActive
        ? `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts?query=${encodedSearchInputs.join(
            ","
          )}&page=${currentPage}`
        : `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts?page=${currentPage}`;

      const response = await axios.get(endpoint);
      const sortedTranscript = response.data.sort(
        (a, b) => a.episode - b.episode
      );

      setTranscript(sortedTranscript);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchInputs]);

  const fetchMetadata = async () => {
    try {
      // Fetch metadata
      const metaResponse = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts/meta"
      );
      const totalCount = metaResponse.data.totalCount;
      setTotalItems(totalCount);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchTitleMetadata = async () => {
    try {
      // Fetch metadata
      const metaResponse = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/titles/meta"
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
        `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts/${episodeNumber}`
      );
      const transcriptItem = response.data;

      // Open the dialog with the full transcript
      setExpandedTranscript(transcriptItem.transcript);
      setExpandedDialogCardId(transcriptItem._id);
      setCurrentEpisodeTitle(
        `Transcript for Episode ${transcriptItem.episode}`
      );
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  const handleSearchSubmit = async () => {
    // Add the new search term to the searchInputs array
    setSearchInputs((prevInputs) => [...prevInputs, typingSearchInput]);
    setIsSearchActive(true);

    try {
      // Construct the search query to include all search terms
      const searchTerms = [...searchInputs, typingSearchInput].map(
        (term) => `"${term}"`
      );
      const searchQuery = searchTerms.join(" ");

      // Fetch search results from the /posts API
      const response = await axios.get(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts",
        {
          params: {
            query: searchQuery
          }
        }
      );
      console.log("query", searchTerms);

      const searchResults = response.data;

      // Use the length of searchResults as the total count
      setTotalItems(searchResults.length);

      // Set the search results to the transcript state
      setTranscript(searchResults);
      setTitles(searchResults);

      // Log the search results and the updated transcript state
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
    setSearchQuery(""); // Clear search query
    fetchData();
    fetchMetadata();
    fetchTitleMetadata(); // Fetch data again to reset results
  };

  const handleTypingSearch = (e) => {
    setTypingSearchInput(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/transcript?page=${pageNumber}`);
  };

  const highlightText = (text) => {
    const regex = new RegExp(typingSearchInput, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow">${match}</span>`
    );
  };

  const openTranscriptDialog = (episodeNumber) => {
    // Check if the transcript for this episode is already loaded
    const transcriptItem = transcript.find(
      (item) => item.episode === episodeNumber
    );

    if (transcriptItem) {
      // If already loaded, open the dialog with the available data
      setExpandedTranscript(transcriptItem.transcript);
      setExpandedDialogCardId(transcriptItem._id);
      setCurrentEpisodeTitle(
        `Transcript for Episode ${transcriptItem.episode}`
      );
      setIsDialogOpen(true);
    } else {
      // If not loaded, make a specific API call to fetch the transcript
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
  //console.log("total pages", totalPages);
  //console.log("transcripts", transcript);

  const classes = useStyles();
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
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className={classes.responsiveButton}
          >
            {i + 1}
          </button>
        ))}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          label="Pandas"
          variant="outlined"
          value={typingSearchInput}
          onChange={handleTypingSearch}
          margin="normal"
          className={classes.responsiveText}
        />
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            onClick={handleSearchSubmit}
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
            className={classes.responsiveButton}
          >
            Search
          </Button>
          <Button
            onClick={clearSearch}
            variant="contained"
            color="secondary"
            className={classes.responsiveButton}
          >
            Clear Search
          </Button>
        </Box>
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
                  <Button
                    onClick={() => openTranscriptDialog(titleItem.episode)}
                    className={classes.responsiveButton}
                  >
                    Open
                  </Button>
                  <Typography
                    variant="h3"
                    component="h2"
                    className={classes.responsiveText}
                  >
                    {titleItem.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    <span className={classes.episodeText}>Episode</span>{" "}
                    {titleItem.episode}
                  </Typography>
                </Box>
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

      <Box display="flex" justifyContent="center" marginTop={2}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </Box>
    </div>
  );
};

export default TranscriptCard;
