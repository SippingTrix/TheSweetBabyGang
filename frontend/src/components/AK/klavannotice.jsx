import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const KlavanNotice = () => {
  return (
    <Accordion style={{ color: "black" }}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ justifyContent: "center" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ fontFamily: "Apple Color Emoji" }}
            >
              Click/Tap Here
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails style={{ justifyContent: "center" }}>
        <Typography>
          I'm missing the first 114 episodes of the Andrew Klavan Show. There's
          3 possible reasons for this:
          <br />
          <br />
          1. Klavan predates all forms of modern media and the first episodes
          were carved into stone tablets and I'm still working to decipher them
          <br />
          <br />
          2. The Daily Wire is apart of the vast right wing conspiracy known as
          Klavanon and is covering up evidence
          <br />
          <br />
          3. That is a lot of work because I'll have to manually snag those
          because the early episodes I cannot find on Youtube. They are on sound
          cloud though I will get around to it one day.
          <br />
          <br />
          Adding transcripts for the Andrew Klavan show has been a long time
          coming for me. Andrew Klavan has had a huge impact on my personal life
          converting to Christianity after being a lifelong athiest. If you're
          reading this Drew, I just want to say you're going to have a lot of
          toasters in heaven.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default KlavanNotice;
