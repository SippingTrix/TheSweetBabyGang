import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  TextField,
  Button
} from "@material-ui/core";
import { Delete, Edit, Check, Close } from "@material-ui/icons";
import Judge from "../../media/honorablewalsh.jpg";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    marginBottom: theme.spacing(2)
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
    fontFamily: "Helvetica Neue"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  bannerLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%"
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
    textAlign: "center",
    boxShadow: theme.shadows[3],
    "&:hover": {
      boxShadow: theme.shadows[6]
    },
    position: "relative"
  },
  cardContent: {
    padding: theme.spacing(2)
  },
  iconButtonRight: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1)
  },
  iconButtonLeft: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1)
  },
  editField: {
    marginBottom: theme.spacing(2)
  },
  addTitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  addTitleInput: {
    marginRight: theme.spacing(1)
  }
}));

const MWtitles = ({ token }) => {
  const classes = useStyles();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [addTitle, setAddTitle] = useState("");

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/bioTitles");
        setTitles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching titles:", error);
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/bioTitles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitles(titles.filter((title) => title._id !== id));
    } catch (error) {
      console.error("Error deleting title:", error);
    }
  };

  const handleEdit = (id, currentTitle) => {
    setEditing(id);
    setNewTitle(currentTitle);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:9000/api/bioTitles/${id}`,
        { title: newTitle },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTitles(
        titles.map((title) =>
          title._id === id ? { ...title, title: newTitle } : title
        )
      );
      setEditing(null);
      setNewTitle("");
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setNewTitle("");
  };

  const handleAddTitle = async () => {
    if (!addTitle) return;
    try {
      const response = await axios.post(
        "http://localhost:9000/api/bioTitles",
        { title: addTitle },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTitles([...titles, response.data]);
      setAddTitle("");
    } catch (error) {
      console.error("Error adding title:", error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTitles = Array.from(titles);
    const [removed] = reorderedTitles.splice(result.source.index, 1);
    reorderedTitles.splice(result.destination.index, 0, removed);

    setTitles(reorderedTitles);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <a
        href="https://twitter.com/MattWalshBlog"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.bannerLink}
      >
        <img src={Judge} alt="Banner" className={classes.bannerLink} />
      </a>
      <Typography variant="h5" className={classes.title}>
        <a
          href="https://twitter.com/MattWalshBlog"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          The Honorable Matt Walsh's Official Titles
        </a>
      </Typography>
      {token && (
        <div className={classes.addTitleContainer}>
          <TextField
            variant="outlined"
            placeholder="Add a new title"
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            className={classes.addTitleInput}
          />
          <Button variant="contained" color="primary" onClick={handleAddTitle}>
            Add Title
          </Button>
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="titles">
          {(provided) => (
            <Grid
              container
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {titles.map((title, index) => (
                <Draggable
                  key={title._id}
                  draggableId={title._id}
                  index={index}
                  isDragDisabled={!token}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          {editing === title._id ? (
                            <>
                              <TextField
                                variant="outlined"
                                fullWidth
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className={classes.editField}
                              />
                              <IconButton onClick={() => handleSave(title._id)}>
                                <Check />
                              </IconButton>
                              <IconButton onClick={handleCancel}>
                                <Close />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <Typography variant="h6">
                                {title.title}
                              </Typography>
                              {token && (
                                <>
                                  <IconButton
                                    className={classes.iconButtonLeft}
                                    onClick={() => handleDelete(title._id)}
                                  >
                                    <Delete />
                                  </IconButton>
                                  <IconButton
                                    className={classes.iconButtonRight}
                                    onClick={() =>
                                      handleEdit(title._id, title.title)
                                    }
                                  >
                                    <Edit />
                                  </IconButton>
                                </>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MWtitles;
