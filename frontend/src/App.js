import React from "react";
import Home from "./components/Home";
import Transcript from "./components/MW/walshTranscript";
import Books from "./components/books";
import { Routes, Route } from "react-router"; // Correct import
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/navbar";
import MW from "./components/MW/cry";
import Library from "./components/library";
import KnowlesTranscript from "./components/MK/knowlesTranscript";
import MKPotlist from "./components/MK/mkpotlist";
import MWtitles from "./components/MW/mwtitles";
import MKFaceoff from "./components/MK/mkfaceoff";
import Cancelled from "./components/MW/dailycancellation";
import Backstage from "./components/Backstage/backstageTranscripts";
import KlavanTranscript from "./components/AK/klavanTranscripts";
import DWOOC from "./components/outofcontext";
import DWSomeContext from "./components/dwsomecontext"; // Import the new component
import DWVideo from "./components/DWVideos";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#303030" // Customize the primary color '#cb767d' - pinkish
    },
    secondary: {
      main: "#ffffff" // Customize the secondary color White - #303030'#cb767d'
    }
  }
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transcript" element={<Transcript />} />
          <Route path="/books" element={<Books />} />
          <Route path="/mw" element={<MW />} />
          <Route path="/library" element={<Library />} />
          <Route path="/sinspinach" element={<MKPotlist />} />
          <Route path="/mktranscripts" element={<KnowlesTranscript />} />
          <Route path="/mwtitles" element={<MWtitles />} />
          <Route path="/mkfaceoff" element={<MKFaceoff />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/backstage" element={<Backstage />} />
          <Route path="/aktranscripts" element={<KlavanTranscript />} />
          <Route path="/outofcontext" element={<DWOOC />} />
          <Route path="/dwsomecontext" element={<DWSomeContext />} />{" "}
          <Route path="/dwlibraryvideos" element={<DWVideo />} />{" "}
          {/* New route */}
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
