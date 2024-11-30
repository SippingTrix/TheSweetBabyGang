import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MKShow from "../media/mkshowcard.png";
import MWShow from "../media/mwshowcard.png";
import AKShow from "../media/akshowcard.png";
import Backstage from "../media/backstage.png";
import AIR from "../media/air.png";
// import OOC from "../media/outofcontext.jpg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    overflow: "hidden",
    width: "100%", // Adjust this value as needed
    justifyContent: "center",
    flexWrap: "wrap"
  },
  imageCard: {
    width: "40%", // Adjust this value as needed
    margin: "20px",
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  cardMedia: {
    height: "auto", // Adjust this value as needed for desktop view
    "@media (max-width: 600px)": {
      height: "auto" // Set height to auto for mobile view
    }
  },
  buttonGroup: {
    marginTop: "20px"
  }
});

const ImageCard = ({ imageUrl, title, description, links }) => {
  const classes = useStyles();

  return (
    <Card className={classes.imageCard}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia} // Apply the class for card media
          component="img"
          alt={title}
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.buttonGroup}>
        <List component="nav" aria-label="secondary mailbox folders">
          {links.map((link, index) => (
            <ListItem
              key={index}
              button
              component="a" // Change component to 'a'
              href={link.url} // Add href attribute
              target={
                link.url === "https://mayflowercigars.com/" ? "_blank" : "_self"
              } // Conditionally apply target attribute
              rel={
                link.url === "https://mayflowercigars.com/"
                  ? "noopener noreferrer"
                  : ""
              } // Conditionally apply rel attribute
            >
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Card>
  );
};

const App = () => {
  const classes = useStyles();

  // Define array of links for each ImageCard
  const image1Links = [
    { text: "Transcripts for The Matt Walsh Show", url: "/transcript" },
    { text: "Daily Cancellations for The Matt Walsh Show", url: "/cancelled" },
    { text: "The Sweet Baby Library", url: "/library" },
    { text: "Acceptable Reasons Men Can Cry", url: "/mw" },
    { text: "Matt Walsh's Prestigious Titles", url: "/mwtitles" }
  ];

  const image2Links = [
    {
      text: "Transcripts for The Michael Knowles Show",
      url: "/mktranscripts"
    },
    {
      text: "Michael Knowles' Dank Names for Sin Spinach",
      url: "/sinspinach"
    },
    {
      text: "Michael Knowles' FACE-OFF Record",
      url: "/mkfaceoff"
    }
  ];
  // const OOCLinks = [
  //   {
  //     text: "Your Favorite DW Hosts Taken Out Of Context",
  //     url: "/dwlibraryvideos"
  //   }
  // ];
  const image3Links = [
    {
      text: "Transcripts for the Andrew Klavan Show: Klavanon is real!",
      url: "/aktranscripts"
    }
  ];
  const image4Links = [
    {
      text: "Transcripts for Daily Wire Backstage",
      url: "/backstage"
    }
  ];

  return (
    <div className={classes.root}>
      <ImageCard
        imageUrl={MWShow}
        title="The Matt Walsh Show"
        description="Transcripts and cancellations for the show will be updated weekly."
        links={image1Links}
      />

      <ImageCard
        imageUrl={MKShow}
        title="The Michael Knowles Show"
        description="Transcripts for the show will be updated weekly."
        links={image2Links}
      />
      <ImageCard
        imageUrl={AKShow}
        title="The Andrew Klavan Show"
        description="Transcripts for the show will be updated weekly."
        links={image3Links}
      />
      {/* <ImageCard
        imageUrl={OOC}
        title="Daily Wire Some Context"
        description="This section is a tribute to X User RealTruthCactus."
        links={OOCLinks}
      /> */}
      <ImageCard
        imageUrl={Backstage}
        title="Daily Wire Backstage"
        description="Probably the only time Candace Owens will appear on this site."
        links={image4Links}
      />

      {/* Add more ImageCard components as needed */}
    </div>
  );
};

export default App;
