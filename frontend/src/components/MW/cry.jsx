import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CryingBanner from "../../media/cryinglist.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%"
  },
  title: {
    width: "100%",
    maxWidth: "800px",
    border: "0",
    borderBottom: "4px solid #cb767d",
    marginBottom: "10px",
    paddingTop: "15px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#999797"
  },
  paper: {
    padding: "20px",
    elevation: 10,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#999797"
  },
  accordion: {
    width: "100%",
    marginBottom: "10px"
  },
  accordionSummary: {
    color: "#cb767d",
    backgroundColor: "#fff"
  },
  accordionDetails: {
    backgroundColor: "#f2f2f2",
    padding: "10px"
  }
}));

export default function MenCryingList() {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <Paper className={classes.paper}>
          <Accordion
            expanded={expanded === `panel0`}
            onChange={handleChange(`panel0`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel0d-content`}
              id={`panel0d-header`}
            >
              <Typography>Reasons Men Are Allowed To Cry</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  See episodes 763, 764, 769, 781 for references on the official
                  list/rule book for reasons men are allowed to cry. <br />{" "}
                  <br />
                  On Episode 763 Matt Walsh cancelled democrat politicians
                  specifially men for crying. Below is a quote from Matt's show
                  on episode 764.{" "}
                </b>{" "}
                <br />
                <br /> My position on the subject of men crying as i mentioned
                yesterday i tweeted that men should not cry in public because
                it's dishonorable and unmanly though i allow for certain
                exceptions which i have outlined in further detail in the past
                um perhaps i should publish an official list you know with an
                index and a glossary and a bibliography and everything so that
                any man if he's considering crying can quickly consult the rule
                book and find out if he's if his upcoming sobbing fit meets the
                requirements you know is this going to be sanctioned crying or
                not but that's a project for another day
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel1`}
            onChange={handleChange(`panel1`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel1d-content`}
              id={`panel1d-header`}
            >
              <Typography>
                <b>Reason #1:</b> Loved one dies
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  The first 5 list items came from episode 763 while cancelling
                  crying politicians. A true epidemic in our country{" "}
                </b>{" "}
                <br />
                <br /> I said men should not cry in public it is unmanly and
                dishonorable rare exceptions can be made to this rule but we
                make far too many exceptions and the exceptions are pretty
                obvious a loved one dies
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel2`}
            onChange={handleChange(`panel2`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel2d-content`}
              id={`panel2d-header`}
            >
              <Typography>
                <b>Reason #2:</b> Child born
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  A dignified tear or two may be acceptable but please don't
                  turn the faucet on okay there's no reason to go overboard
                  don't try to prove a point{" "}
                </b>{" "}
                <br />
                <br /> The exceptions are pretty obvious a loved one dies your
                child is born.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel3`}
            onChange={handleChange(`panel3`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel3d-content`}
              id={`panel3d-header`}
            >
              <Typography>
                <b>Reason #3:</b> Bride is walking down aisle
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  A dignified tear or two may be acceptable but please don't
                  turn the faucet on okay there's no reason to go overboard
                  don't try to prove a point
                </b>{" "}
                <br />
                <br /> The exceptions are pretty obvious a loved one dies your
                child is born your bride is walking down the aisle at your
                wedding
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel4`}
            onChange={handleChange(`panel4`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel4d-content`}
              id={`panel4d-header`}
            >
              <Typography>
                <b>Reason #4:</b> Saying goodbye to a family member before a 3
                year voyage to Mars
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  The first 5 list items came from episode 763 while cancelling
                  crying politicians. A true epidemic in our country <br />{" "}
                </b>
                <br />
                Other exceptions can be imagined we've talked about some of them
                before perhaps for example you're saying goodbye to your family
                before embarking on a three-year voyage to mars
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel5`}
            onChange={handleChange(`panel5`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel5d-content`}
              id={`panel5d-header`}
            >
              <Typography>
                <b>Reason #5:</b> Watching the end of the movie Rudy
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  The first 5 list items came from episode 763 while cancelling
                  crying politicians. A true epidemic in our country{" "}
                </b>{" "}
                <br />
                <br /> Other exceptions can be imagined we've talked about some
                of them before perhaps for example you're saying goodbye to your
                family before embarking on a three-year voyage to mars maybe
                you're watching the end of the movie rudy
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel6`}
            onChange={handleChange(`panel6`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel6d-content`}
              id={`panel6d-header`}
            >
              <Typography>
                <b>Reason #6:</b> Moved to tears of joy and inspiration by
                anything Matt says
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b> During the comments section </b> <br />
                <br /> Joshua says matt's comments on what it means to truly be
                a man were so beautiful that it made me cry well there you go
                there is another exception that certainly i think we can all
                agree is an exception uh if you were moved to town and i will
                say this in fact it's important to say this right now if you're
                a man listening to this show um and you're moved to tears of of
                of joy and inspiration by anything that i say that is perfectly
                okay i know that my words are that powerful and i would never
                judge you for it you absolute pansy
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel7`}
            onChange={handleChange(`panel7`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel7d-content`}
              id={`panel7d-header`}
            >
              <Typography>
                <b>Reason #7:</b> True Patriotism
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  During the comments section. This was in reference to Tamyra
                  Mensah-Stock and her display of Patriotism while winning the
                  gold medal at the Tokyo Olympics on August 3, 2021{" "}
                </b>{" "}
                <br />
                <br /> Cool Papa J Magic says i know i'm not supposed to cry as
                a man but i teared up just a little bit to see that woman so
                happy to represent our beautiful country and i will allow that
                that i will allow will previously i said i think there are six
                reasons acceptable reasons for a man to cry i'll add number
                seven i'll give you that you're welcome
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel8`}
            onChange={handleChange(`panel8`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel8d-content`}
              id={`panel8d-header`}
            >
              <Typography>
                <b>Reason #8:</b> Child comes home healthy after NICU
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b> During the comments section </b> <br />
                <br /> Graham says matt i agree with you about men crying but i
                have one acceptable addition to the list after an 18-day stay in
                nicu in which he almost passed we brought my now healthy son
                home to God be the glory well graham that certainly would be an
                exception for crying and uh congratulations to to you and to
                your son and to your family
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel9`}
            onChange={handleChange(`panel9`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel9d-content`}
              id={`panel9d-header`}
            >
              <Typography>
                <b>Reason #9:</b> Intense Spiritual Experience
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  Source Video on DailyWire+ YT Channel: 7 times it's Ok For Men
                  To Cry{" "}
                </b>{" "}
                <br />
                <br />{" "}
                https://www.youtube.com/watch?v=YE4sryOimTU&list=WL&index=39
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel10`}
            onChange={handleChange(`panel10`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel10d-content`}
              id={`panel10d-header`}
            >
              <Typography>
                <b>Reason #10:</b> Kicked in the Shins by a Horse
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  Source Video on DailyWire+ YT Channel: 7 times it's Ok For Men
                  To Cry{" "}
                </b>{" "}
                <br />
                <br />{" "}
                https://www.youtube.com/watch?v=YE4sryOimTU&list=WL&index=39
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel11`}
            onChange={handleChange(`panel11`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel11d-content`}
              id={`panel11d-header`}
            >
              <Typography>
                <b>Reason #11:</b> His Wife's Lasagna
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  Source Video on DailyWire+ YT Channel: 7 times it's Ok For Men
                  To Cry{" "}
                </b>{" "}
                <br />
                <br />{" "}
                https://www.youtube.com/watch?v=YE4sryOimTU&list=WL&index=39
                <br /> <br /> "If your if your wife makes you a lasagna that is
                just so good that it brings you to tears that's acceptable." -
                Matt Walsh
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel12`}
            onChange={handleChange(`panel12`)}
            className={classes.accordion}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls={`panel12d-content`}
              id={`panel12d-header`}
            >
              <Typography>
                <b>Reason #12:</b> Being Served Chili with Ground Turkey & Black
                Beans
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="body1">
                <b>
                  {" "}
                  Source Video on DailyWire+ YT Channel: 7 times it's Ok For Men
                  To Cry{" "}
                </b>{" "}
                <br />
                <br />{" "}
                https://www.youtube.com/watch?v=YE4sryOimTU&list=WL&index=39
                <br /> <br /> Throw the bowl of chili go to somebody's house and
                this has happened to me before you go to somebody's house and
                they say oh we're having chili and you say oh wow this makes my
                day and then they serve you the bowl of chili but then you
                discover that the chili is made with ground turkey and black
                beans then it's it's acceptable actually to throw the the hot
                bowl of chili at the person who served it to you and cry and
                that's acceptable not only morally and ethically but also
                legally I believe that's the the law stipulates that I pretty
                sure in most states anyway those are the seven times
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Repeat the above Accordion components for the remaining reasons */}
        </Paper>
      </div>
    </div>
  );
}

// intense spiritual experience
// kicked in the shins by a horse
// Your wife makes you a lasana that's so good it just brings you to tears
// If you go to somebodys house and they say we are having chili and the chili is made with ground turkey and black beans
