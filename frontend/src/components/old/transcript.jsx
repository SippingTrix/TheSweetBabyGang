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

const useStyles = makeStyles((theme) => ({
  episodeText: {
    color: "#cb767d"
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

  const [searchInput, setSearchInput] = useState("");
  const [typingSearchInput, setTypingSearchInput] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredTitle = title.filter((titleItem) =>
    titleItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = async () => {
    try {
      // Fetch titles and episodes
      const titlesResponse = await axios.get(
        //`https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/titles?page=${currentPage}`
        `http://localhost:9000/api/titles?page=${currentPage}`
      );
      setTitles(titlesResponse.data);

      const encodedSearchInput = encodeURIComponent(searchInput);
      const endpoint = isSearchActive
        ? //? `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts?query=${encodedSearchInput}&page=${currentPage}`
          //: `https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts?page=${currentPage}`;
          `http://localhost:9000/api/posts?query=${encodedSearchInput}&page=${currentPage}`
        : `http://localhost:9000/api/posts?page=${currentPage}`;

      const response = await axios.get(endpoint);
      const sortedTranscript = response.data.sort(
        (a, b) => a.episode - b.episode
      );

      //setTranscript(sortedTranscript);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, searchInput]);

  const fetchMetadata = async () => {
    try {
      // Fetch metadata
      const metaResponse = await axios.get(
        //"https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts/meta"
        "http://localhost:9000/api/posts/meta"
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

  const fetchTranscript = async (episodeNumber) => {
    try {
      const response = await axios.get(
        //`https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts/${episodeNumber}`
        `http://localhost:9000/api/posts/${episodeNumber}`
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
    setSearchInput(typingSearchInput);
    setIsSearchActive(true);

    try {
      // Fetch search results from the /posts API
      const response = await axios.get(
        //"https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/posts",
        "http://localhost:9000/api/posts",
        {
          params: {
            query: typingSearchInput
          }
        }
      );

      const searchResults = response.data;

      // Use the length of searchResults as the total count
      setTotalItems(searchResults.length);

      // Set the search results to the transcript state
      setTranscript(searchResults);
      setTitles(searchResults);

      // Log the search results and the updated transcript state
      console.log("Search Results:", searchResults);
      console.log("Updated Transcript State:", transcript);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  // useEffect(() => {
  //   console.log("Updated Transcript State:", transcript);
  // }, [transcript]);

  const clearSearch = () => {
    setSearchInput("");
    setTypingSearchInput("");
    setIsSearchActive(false);
    fetchData();
    fetchMetadata(); // Fetch data again to reset results
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
  console.log("total pages", totalPages);
  console.log("transcripts", transcript);
  const classes = useStyles();
  return (
    <div>
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
          >
            {i + 1}
          </button>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <TextField
            label="Pandas"
            variant="outlined"
            value={typingSearchInput}
            onChange={handleTypingSearch}
          />
          <Button
            onClick={handleSearchSubmit}
            variant="contained"
            color="primary"
          >
            Search
          </Button>

          {isSearchActive && (
            <Chip
              label="Clear Search"
              size="small"
              onDelete={clearSearch}
              variant="outlined"
              style={{ marginLeft: 8 }}
            />
          )}
        </Box>
      </Box>
      <Grid container spacing={2}>
        {filteredTitle.map((titleItem) => (
          <Grid item xs={12} sm={6} key={titleItem._id}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" component="h2">
                    {titleItem.title}
                  </Typography>
                  <Button
                    onClick={() => openTranscriptDialog(titleItem.episode)}
                  >
                    Popout
                  </Button>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  <span className={classes.episodeText}>Episode:</span>{" "}
                  {titleItem.episode}
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
        <DialogTitle>{currentEpisodeTitle}</DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            component="p"
            dangerouslySetInnerHTML={{
              __html: highlightText(expandedTranscript)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
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
