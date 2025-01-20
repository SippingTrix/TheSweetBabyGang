import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  makeStyles,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Container,
  Grid
} from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logo from "../media/dwlogo.png";

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "50px", // Adjust the value to make the oval shape smoother or sharper
    overflow: "hidden"
  },
  image: {
    width: "250px",
    marginTop: "15px"
  },
  navbarButton: {
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: "theme.palette.primary.dark"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  selectedButton: {
    backgroundColor: "#b0b0b0"
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBar: {
    backgroundColor: "#000000", // Set the background color of the AppBar
    borderBottom: "4px solid #b0b0b0",
    width: "auto",
    marginBottom: "15px",
    position: "static",
    zIndex: theme.zIndex.drawer + 1
  },
  dropdownIcon: {
    marginLeft: theme.spacing(1)
  },
  fullWidthAccordion: {
    width: "100%",
    position: "relative",
    top: "0",
    zIndex: theme.zIndex.drawer
  },
  columnTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold"
  }
}));

const Navbar = ({ token, handleLogout }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? classes.selectedButton : "";
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuItems = [
    {
      title: "Home",
      items: [{ name: "DWLibrary Home", link: "/" }]
    },
    {
      title: "Matt Walsh",
      items: [
        { name: "Matt Walsh Transcripts", link: "/transcript" },
        { name: "Matt Walsh Daily Cancellation", link: "/cancelled" },
        { name: "Sweet Baby Library", link: "/library" },
        { name: "Acceptable Reasons Men Can Cry", link: "/mw" },
        { name: "Matt Walsh's Prestigious Titles", link: "/mwtitles" }
      ]
    },
    {
      title: "Michael Knowles",
      items: [
        { name: "Michael Knowles Transcripts", link: "/mktranscripts" },
        {
          name: "Michael Knowles' Dank Names for Sin Spinach",
          link: "/sinspinach"
        },
        { name: "Michael Knowles Face Off", link: "/mkfaceoff" }
      ]
    },
    {
      title: "Andrew Klavan",
      items: [{ name: "Andrew Klavan Transcripts", link: "/aktranscripts" }]
    },
    {
      title: "More Daily Wire",
      items: [{ name: "Backstage Transcripts", link: "/backstage" }]
    }
  ];

  if (token) {
    menuItems.push({
      title: "Admin",
      items: [
        {
          name: "Admin Page",
          link: "/admin"
        },
        {
          name: "Cancelled Admin Page",
          link: "/cancelledadmin"
        },
        {
          name: "Logout",
          link: "/login",
          onClick: () => {
            handleLogout();
            navigate("/login");
          }
        }
      ]
    });
  }

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img src={Logo} alt="Logo" className={classes.image} />
          </Link>
          <Box className={classes.navbarContainer}>
            <Button
              color="secondary"
              className={classes.navbarButton}
              onClick={handleMenuToggle}
            >
              <Typography variant="h6" component="span">
                The Archives
              </Typography>
              <ExpandMoreIcon className={classes.dropdownIcon} />
            </Button>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {menuOpen && (
        <Accordion
          expanded={menuOpen}
          onChange={handleMenuToggle}
          className={classes.fullWidthAccordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="menu-content"
            id="menu-header"
          >
            <Typography variant="h6">The Daily Wire Library</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container>
              <Grid container spacing={3}>
                {menuItems.map((column) => (
                  <Grid item xs={12} sm={6} md={3} key={column.title}>
                    <Typography variant="h6" className={classes.columnTitle}>
                      {column.title}
                    </Typography>
                    {column.items.map((item) => (
                      <MenuItem
                        key={item.link}
                        component={Link}
                        to={item.link}
                        onClick={() => {
                          closeMenu();
                          if (item.onClick) item.onClick();
                        }}
                        className={isActive(item.link)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Container>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default Navbar;
