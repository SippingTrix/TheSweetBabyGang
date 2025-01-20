import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Transcript from "./components/MW/walshTranscript";
import Books from "./components/books";
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
import DWSomeContext from "./components/dwsomecontext";
import DWVideo from "./components/DWVideos";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage"; // Import the AdminPage component
import CancelledAdminPage from "./components/CancelledAdminPage"; // Import the CancelledAdminPage component

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#303030" // Customize the primary color
    },
    secondary: {
      main: "#ffffff" // Customize the secondary color
    }
  }
});

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSetToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transcript" element={<Transcript />} />
        <Route path="/books" element={<Books />} />
        <Route path="/mw" element={<MW />} />
        <Route path="/library" element={<Library />} />
        <Route path="/sinspinach" element={<MKPotlist />} />
        <Route path="/mktranscripts" element={<KnowlesTranscript />} />
        <Route path="/mwtitles" element={<MWtitles token={token} />} />
        <Route path="/mkfaceoff" element={<MKFaceoff />} />
        <Route path="/cancelled" element={<Cancelled />} />
        <Route path="/backstage" element={<Backstage />} />
        <Route path="/aktranscripts" element={<KlavanTranscript />} />
        <Route path="/outofcontext" element={<DWOOC />} />
        <Route path="/dwsomecontext" element={<DWSomeContext />} />
        <Route path="/dwlibraryvideos" element={<DWVideo />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route
          path="/titles"
          element={
            token ? <MWtitles token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin"
          element={
            token ? <AdminPage token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cancelledadmin"
          element={
            token ? (
              <CancelledAdminPage token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
