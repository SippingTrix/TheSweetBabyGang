import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid
} from "@material-ui/core";
import Judge from "../media/honorablewalsh.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
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
  listContainer: {
    marginTop: theme.spacing(2)
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[1],
    transition: "box-shadow 0.3s", // Adding transition effect
    "&:hover": {
      boxShadow: theme.shadows[4] // Increasing shadow on hover
    }
  },
  listItemBackground: {
    padding: theme.spacing(1, 2), // Adding padding for better visibility
    borderRadius: theme.shape.borderRadius
  }
}));

const MWtitles = () => {
  const classes = useStyles();

  const listItems = [
    "Handsome",
    "Brilliant",
    "Comedian",
    "Oscar contender",
    "World Renowned DEI Consultant",
    "Acclaimed Bottled Water Critic",
    "Actor",
    "Alpaca Groomer",
    "America’s Highest Legal Authority",
    "Beekeeping influencer",
    "Biologist",
    "Celebrated Podcast Host",
    "Celebrated banjo player",
    "Country's Leading Cult Leader",
    "Dancer",
    "Dancing With The Stars Contestant",
    "Fashion Guru",
    "Father",
    "Husband",
    "Alien Enthusiast",
    "Documentarian",
    "Number 1 Best Selling Children's LGBTQ+ Author",
    "Philanthropist",
    "Potential Pulitzer Nominee",
    "Proud former Virginia resident",
    "Son",
    "The Honorable Matt Walsh",
    "Theocratic Fascist Dictator",
    "Translucent Rights Advocate",
    "Transphobe of the Year",
    "Tyrant",
    "Voice Actor",
    "Women’s Studies Scholar",
    "Zookeeper"
  ];

  const mid = Math.ceil(listItems.length / 2);
  const leftColumn = listItems.slice(0, mid);
  const rightColumn = listItems.slice(mid);

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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.listContainer}>
            <List>
              {leftColumn.map((item, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <div className={classes.listItemBackground}>
                    <ListItemText primary={item} />
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.listContainer}>
            <List>
              {rightColumn.map((item, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <div className={classes.listItemBackground}>
                    <ListItemText primary={item} />
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MWtitles;
