import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  Chip
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textArea: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  chipContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const CancelledAdminPage = ({ token }) => {
  const classes = useStyles();
  const [cancelled, setCancelled] = useState("");
  const [episode, setEpisode] = useState("");
  const [context, setContext] = useState("");
  const [Category, setCategory] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Celebrities",
    "Colleges & Schools",
    "Columnist & Journalist",
    "Corporations",
    "Culture",
    "Fat Acceptance",
    "Feminist & Feminism",
    "Forbidden",
    "Government",
    "Himself",
    "His Co-Workers",
    "His Family",
    "LGBTQ & WIAW",
    "Mass Cancellations",
    "Media Outlets",
    "Misc",
    "No Cancellation",
    "Police Departments",
    "Politics & Politicians",
    "Public Health & Science",
    "Race Baiting & Hoaxing",
    "Religion",
    "Religious",
    "Reverse Cancellation",
    "SBG Favorites",
    "SBH Favorites",
    "Scum Of The Earth",
    "Social Media & Viral Internet Moments",
    "Sports",
    "States & Countries",
    "Sweet Daddy Cone"
  ];

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cancelled || !episode || !context || !Category) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/canceltitles",
        { cancelled, episode, Category },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      await axios.post(
        "https://the-sweet-baby-gang-backend-git-main-tyler-sowers-projects.vercel.app/api/cancelled",
        { cancelled, episode, context, Category },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCancelled("");
      setEpisode("");
      setContext("");
      setCategory("");
      setError("");
      alert("Post successful");
    } catch (err) {
      console.error("Error posting data:", err);
      setError("Error posting data");
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Cancelled Admin Page
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Cancelled"
            value={cancelled}
            onChange={(e) => setCancelled(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Episode Number"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
          />
          <div className={classes.chipContainer}>
            {categories.map((cat, index) => (
              <Chip
                key={index}
                label={cat}
                clickable
                color={Category === cat ? "primary" : "default"}
                onClick={() => handleCategorySelect(cat)}
                className={classes.chip}
              />
            ))}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            minRows={10}
            label="Context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className={classes.textArea}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CancelledAdminPage;
