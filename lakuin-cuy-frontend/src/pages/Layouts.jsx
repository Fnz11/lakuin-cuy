/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import backgroundImage from "../assets/backgroundNotes.jpg";
import TextChar from "../Component/Framer/TextChar";
import { motion } from "framer-motion";
import useAuthHeader from "../hooks/Auth/useAuthHeader";

const drawerWidth = 240;
const colorMain1 = "rgba(0,0,0,0.5)";
const colorMain2 = "rgba(0,0,0,0.8)";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: colorMain1,

  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: colorMain1,

  color: "white",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: colorMain1,
  color: "white",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: colorMain1,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),

  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Layouts() {
  // AUTH
  const [anchorEl, setAnchorEl] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) navigate("/login");
    const localUsername = JSON.parse(user).username;
    const token = JSON.parse(user).token;
    useAuthHeader(token);

    if (localUsername != username) navigate("/auth/error");
  }, [user]);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: "My Notes",
      icon: <FormatListBulletedOutlinedIcon style={{ color: "white" }} />,
      path: `/${username}/notes`,
    },
    {
      text: "Add Notes",
      icon: <AddOutlinedIcon style={{ color: "white" }} />,
      path: `/${username}/create`,
    },
  ];

  const handlePopover = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(anchorEl);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Option = ({ text, handleClick, params }) => {
    return (
      <>
        <motion.li
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "7px 20px",
            cursor: "pointer",
            overflow: "hidden",
            transition: "color 0.3s",
          }}
          onClick={() => handleClick(params)}
          initial={"closed"}
          animate={"open"}
          whileHover={"hover"}
        >
          <Typography
            style={{
              color: "black",
              textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
            }}
          >
            {text}
          </Typography>
        </motion.li>
      </>
    );
  };

  // STYLE
  const isMobile = useMediaQuery("(max-width: 960px)");
  const containerStyle = {
    overflow: "hidden",
    display: "flex",
    padding: "12px 0px",
  };
  const active = {
    background: colorMain2,
    backdropFilter: "blur(2px)",
    padding: "13px 30px",
  };
  const list = {
    padding: "13px 30px",
  };
  const childrenStyle = {
    backgroundImage: `url(${backgroundImage}`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flex: "1",
    padding: isMobile ? `10vh 20px 0px 70px` : `10vh 20px 0px 100px`,
    height: "90vh",
    overflowY: "auto",
  };
  const heading = {
    fontSize: isMobile ? "1.4rem" : "1.7rem",
    fontFamily: "Kaushan Script",
    padding: "2px",
    textShadow: "2px 2px 3px rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
  };
  const errorAuthBack = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
  };
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
    hover: {
      backgroundColor: "rgb(244,244,244)",
    },
  };
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      <div>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 4.5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
                <motion.div
                  variant={{}}
                  onClick={() => navigate(`/${username}/notes`)}
                  whileHover={{
                    scale: 1.1,
                    y: -1,
                    cursor: "pointer",
                    color: "rgba(200,200,200,1)",
                  }}
                >
                  <TextChar
                    text={`Lakuin Cuy`}
                    containerStyle={containerStyle}
                    textParamStyle={heading}
                  />
                </motion.div>
              </div>
            </div>
            <div>
              {username && (
                <>
                  <motion.div
                    animate={openPop ? "open" : "closed"}
                    style={{ position: "relative", marginRight: "10px" }}
                  >
                    <motion.div
                      variants={{
                        hover: {
                          scale: 1.1,
                          color: "rgb(210, 210, 210)",
                        },
                      }}
                      whileHover={"hover"}
                      aria-describedby={id}
                      onClick={handlePopover}
                    >
                      <TextChar
                        text={`${username}`}
                        containerStyle={containerStyle}
                        textParamStyle={{
                          fontSize: isMobile ? "1rem" : "1.4rem",
                          cursor: "pointer",
                          letterSpacing: isMobile ? "2px" : "3px",
                        }}
                      />
                    </motion.div>
                    <Popover
                      id={id}
                      open={openPop}
                      anchorEl={anchorEl}
                      onClose={handleClosePopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <motion.ul
                        initial={"closed"}
                        animate={"open"}
                        whileHover={{}}
                        variants={wrapperVariants}
                        style={{
                          margin: 0,
                          padding: "15px 0px",
                          top: "120%",
                          left: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <Option
                          handleClick={() => {
                            localStorage.removeItem("user");
                            navigate("/login");
                          }}
                          text="logout"
                        />
                        <Option
                          handleClick={() => navigate("/login")}
                          text="login"
                        />
                        <Option
                          handleClick={() => navigate("/register")}
                          text="register"
                        />
                      </motion.ul>
                    </Popover>
                  </motion.div>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton style={{ color: "white" }} onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                onClick={() => navigate(item.path)}
                key={item.text}
                button
                style={location.pathname == item.path ? active : list}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }}>
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <div style={{ margin: "0" }}>
        {/* <DrawerHeader /> */}
        <div style={childrenStyle}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layouts;
