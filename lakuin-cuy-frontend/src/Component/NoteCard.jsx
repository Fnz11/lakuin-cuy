/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import {
  red,
  blue,
  orange,
  green,
  brown,
  cyan,
  deepPurple,
  amber,
} from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteNotes } from "../hooks/Note/useDeleteNotes";
import { usePatchNotes } from "../hooks/Note/usePatchNotes";
import { motion } from "framer-motion";
import TextChar from "../Component/Framer/TextChar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useAuthHeader from "../hooks/Auth/useAuthHeader";

function NoteCard({ note, delay }) {
  // AUTH
  const user = localStorage.getItem("user");
  if (!user) {
    return;
  }
  const token = JSON.parse(user).token;
  useEffect(() => {
    useAuthHeader(token);
  }, [user]);
  const { username } = useParams();

  const navigate = useNavigate();
  const [color1, setColor1] = useState("inherit");
  const [color2, setColor2] = useState("inherit");
  const [star, setStar] = useState(note.star);
  const { mutate: deleteMutate } = useDeleteNotes();
  const { mutate: patchMutate } = usePatchNotes();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePatch = (note) => {
    const updatedNote = { ...note, star: !star, username };
    setStar(!star);
    patchMutate(updatedNote);
    if (!star == true) {
      toast.info("Berhasil menandai note", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.info("Berhasil menghapus tanda note", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const deleteParams = {
    username: username,
    id: note._id,
    token: token,
  };
  const handleDelete = (data) => {
    const { id, token, username } = data;
    deleteMutate({ id, token, username });
    toast.error("Berhasil hapus note", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handlePopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    switch (note.color) {
      case "red":
        setColor1(red[200]);
        setColor2(red[300]);
        break;
      case "yellow":
        setColor1(amber[200]);
        setColor2(amber[300]);
        break;
      case "blue":
        setColor1(blue[200]);
        setColor2(blue[300]);
        break;
      case "orange":
        setColor1(orange[200]);
        setColor2(orange[300]);
        break;
      case "green":
        setColor1(green[200]);
        setColor2(green[300]);
        break;
      case "brown":
        setColor1(brown[200]);
        setColor2(brown[300]);
        break;
      case "cyan":
        setColor1(cyan[200]);
        setColor2(cyan[300]);
        break;
      case "deepPurple":
        setColor1(deepPurple[200]);
        setColor2(deepPurple[300]);
        break;
      default:
    }
  }, [note.color]);

  const cardStarStyle = {
    borderRadius: "2px",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.6)",
    minHeight: "250px",
  };
  const cardNotStarStyle = {
    borderRadius: "2px",
    boxShadow: "3px 3px 7px 2px rgba(0, 0, 0, 0.6)",
  };
  const cardHeading = {
    backgroundColor: color2,
    padding: "25px",
  };
  const textHead = {
    textShadow: "2px 2px 3px rgba(0,0,0,0.2)",
    color: "white",
    fontSize: "1.5rem",
  };
  const textSubHead = {
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "1.15rem",
  };
  const textBody = {
    fontSize: "1rem",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
    color: "rgba(255,255,255,0.8)",
  };
  const containerStyle = {
    overflow: "hidden",
    display: "flex",
  };

  // VARIANT
  const containerVariant = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 50,
        stiffness: 150,
        delay: delay / 10,
      },
    },
    drag: {
      scale: 0.95,

    }
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
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
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
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
    hover: {
      scale: 1.1,
    },
  };

  const Option = ({ text, Icon, handleClick, params }) => {
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
            transition: "color 0.3s", // Efek transisi pada warna teks saat hover
          }}
          onClick={() => handleClick(params)}
          initial={"closed"}
          animate={"open"}
          whileHover={"hover"}
        >
          <motion.span variants={actionIconVariants}>
            <IconButton>
              <Icon style={{ color: color2 }} />
            </IconButton>
          </motion.span>

          <Typography
            style={{
              color: color2,
              textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
            }}
          >
            {text}
          </Typography>
        </motion.li>
      </>
    );
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      variants={containerVariant}
      initial={"hidden"}
      animate={"visible"}
      whileDrag={'drag'}
    >
      <Card elevation={1} style={note.star ? cardStarStyle : cardNotStarStyle}>
        <CardHeader
          title={
            <div>
              <Typography>
                <TextChar
                  text={`${note.title}`}
                  containerStyle={containerStyle}
                  textParamStyle={textHead}
                  delay={0}
                />
              </Typography>
            </div>
          }
          style={cardHeading}
          subheader={
            <TextChar
              text={`${note.category} - ${note.time}`}
              containerStyle={containerStyle}
              textParamStyle={textSubHead}
              delay={0.2}
            />
          }
          action={
            <motion.div
              animate={open ? "open" : "closed"}
              style={{ position: "relative" }}
            >
              <Button aria-describedby={id} onClick={handlePopover}>
                <motion.span variants={iconVariants}>
                  <KeyboardArrowDownIcon style={{ color: "white" }} />
                </motion.span>
              </Button>

              <Popover
                id={id}
                open={open}
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
                    Icon={EditIcon}
                    handleClick={() =>
                      navigate(`/${note.user}/edit/${note._id}`, {
                        state: { note: note },
                      })
                    }
                    text="Edit"
                  />
                  <Option
                    Icon={star ? BookmarkIcon : BookmarkBorderIcon}
                    handleClick={handlePatch}
                    params={note}
                    text="Tandai"
                  />
                  <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    limit={3}
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                  <Option
                    Icon={DeleteOutlineIcon}
                    params={deleteParams}
                    handleClick={handleDelete}
                    text="Hapus"
                  />
                  <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    limit={3}
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                </motion.ul>
              </Popover>
            </motion.div>
          }
        />
        <CardContent
          style={{ paddingTop: 0, backgroundColor: color1, minHeight: "220px" }}
        >
          <Divider style={{ marginBottom: "15px" }} />
          <TextChar
            text={`${note.body}`}
            containerStyle={containerStyle}
            textParamStyle={textBody}
            delay={0.6}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default NoteCard;
