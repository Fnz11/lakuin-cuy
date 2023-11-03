/* eslint-disable no-dupe-keys */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { usePostNotes } from "../hooks/Note/usePostNotes";
import TextChar from "../Component/Framer/TextChar";
import useAuthHeader from "../hooks/Auth/useAuthHeader";

function Create() {
  const user = localStorage.getItem("user");
  useEffect(() => {
    const token = JSON.parse(user).token;
    useAuthHeader(token);
  }, [user]);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("deepPurple");
  const [category, setCategory] = useState("todos");
  const [isTouchedTitle, setIsTouchedTitle] = useState(false);
  const [isTouchedBody, setIsTouchedBody] = useState(false);
  const [isTouchedTime, setIsTouchedTime] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isBodyEmpty, setIsBodyEmpty] = useState(false);
  const [isTimeEmpty, setIsTimeEmpty] = useState(false);
  const mutate = usePostNotes();

  const { username } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title == "") {
      setIsTitleEmpty(true);
      return;
    }
    if (body == "") {
      setIsBodyEmpty(true);
      return;
    }
    if (time == "") {
      setIsTimeEmpty(true);
      return;
    }

    if (title && body && time) {
      mutate({ title, body, time, category, color, username });
      navigate(`/${username}/notes`);
    }
  };

  const handleToast = () => {
    if (title && body && time) {
      toast.info("Berhasil membuat note", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Harus diisi semuaa", {
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

  useEffect(() => {
    if (!time && isTouchedTime) setIsTimeEmpty(true);
    else setIsTimeEmpty(false);

    if (!title && isTouchedTitle) setIsTitleEmpty(true);
    else setIsTitleEmpty(false);

    if (!body && isTouchedBody) setIsBodyEmpty(true);
    else setIsBodyEmpty(false);
  }, [title, body, time]);

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    setIsTouchedBody(true);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setIsTouchedTime(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsTouchedTitle(true);
  };

  const colorOptions2 = ["green", "brown", "cyan", "deepPurple"];
  const colorOptions1 = ["red", "yellow", "blue", "orange"];
  const isMobile = useMediaQuery("(max-width: 960px)");

  // STYLES
  const clas = {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  };
  const formStyle = {
    backgroundColor: "white",
    width: isMobile ? "80%" : "50%",
    marginBottom: "30px",
    padding: "30px 25px 40px 25px",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.6)",
    borderRadius: "2px",
  };
  const radioGroupStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: isMobile ? "column" : "row",
  };
  const textParamStyle = {
    fontWeight: "bold",
    textShadow: "5px 5px 10px rgba(0,0,0,1)",
    fontSize: isMobile && "2rem",
    color: "white",
    textAlign: "center",
  };
  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    display: "flex",
    padding: isMobile ? "10px" : "5px 30px 30px 30px",
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
        damping: 12,
        stiffness: 150,
      },
    },
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title ? (
          <TextChar
            text={title}
            containerStyle={containerStyle}
            textParamStyle={textParamStyle}
          />
        ) : (
          <TextChar
            text={"Bikin note baru"}
            containerStyle={containerStyle}
            textParamStyle={textParamStyle}
          />
        )}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          style={formStyle}
        >
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <motion.div
              variants={{
                hidden: {
                  y: 100,
                  opacity: 0,
                },
                visible: {
                  y: 1,
                  opacity: 1,
                  transition: {
                    delay: 0,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <TextField
                style={clas}
                onChange={handleTitleChange}
                label="Title"
                variant="outlined"
                error={isTitleEmpty}
                helperText={isTitleEmpty ? "Title is required" : ""}
                required
                fullWidth
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  y: 100,
                  opacity: 0,
                },
                visible: {
                  y: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.1,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <TextField
                style={clas}
                onChange={handleBodyChange}
                label="Body"
                variant="outlined"
                error={isBodyEmpty}
                helperText={isBodyEmpty ? "Body is required" : ""}
                multiline
                rows={5}
                required
                fullWidth
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  y: 100,
                  opacity: 0,
                },
                visible: {
                  y: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <TextField
                style={clas}
                onChange={handleTimeChange}
                label="Time"
                variant="outlined"
                error={isTimeEmpty}
                helperText={isTimeEmpty ? "Time is required" : ""}
                required
                fullWidth
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  y: 100,
                  opacity: 0,
                },
                visible: {
                  y: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              style={radioGroupStyle}
            >
              <FormControl style={clas}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value={"money"}
                    control={<Radio />}
                    label="Money"
                  />
                  <FormControlLabel
                    value={"todos"}
                    control={<Radio />}
                    label="todos"
                  />
                  <FormControlLabel
                    value={"reminders"}
                    control={<Radio />}
                    label="reminders"
                  />
                  <FormControlLabel
                    value={"work"}
                    control={<Radio />}
                    label="work"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl style={clas}>
                <FormLabel>Note Color</FormLabel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <RadioGroup
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    {colorOptions1.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option.charAt(0).toUpperCase() + option.slice(1)} // Kapitalize huruf pertama
                      />
                    ))}
                  </RadioGroup>

                  <RadioGroup
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    {colorOptions2.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option.charAt(0).toUpperCase() + option.slice(1)} // Kapitalize huruf pertama
                      />
                    ))}
                  </RadioGroup>
                </div>
              </FormControl>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  y: 100,
                  opacity: 0,
                },
                visible: {
                  y: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <Button
                style={{
                  padding: "12px 30px",
                  margin: "7px 0px",
                  width: "120px",
                }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => handleToast()}
                endIcon={<KeyboardArrowRightIcon />}
              >
                Submit
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
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
    </>
  );
}

export default Create;
