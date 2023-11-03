/* eslint-disable no-unused-vars */
import {
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextChar from "../Component/Framer/TextChar";
import backgroundImageHeading from "../assets/backgroundNotesHeading.jpg";
import { motion } from "framer-motion";
import { useRegister } from "../hooks/Auth/useRegister";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToutchedUsername, setIsTouchedUsername] = useState(false);
  const [isToutchedEmail, setIsTouchedEmail] = useState(false);
  const [isToutchedPassword, setIsTouchedPassword] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const { mutate, errorMessage, isLoading } = useRegister();

  useEffect(() => {
    if (!username && isToutchedUsername) setIsUsernameEmpty(true);
    else setIsUsernameEmpty(false);

    if (!email && isToutchedEmail) setIsEmailEmpty(true);
    else setIsEmailEmpty(false);

    if (!password && isToutchedPassword) setIsPasswordEmpty(true);
    else setIsPasswordEmpty(false);
  }, [username, email, password]);

  const handeEmailChange = (e) => {
    setEmail(e.target.value);
    setIsTouchedEmail(true);
  };

  const handeUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsTouchedUsername(true);
  };

  const handePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTouchedPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setIsUsernameEmpty(true);
    }
    if (!password) {
      setIsPasswordEmpty(true);
    }
    if (!email) {
      setIsEmailEmpty(true);
    }

    mutate({ username, email, password });
  };

  const loginButton = () => {
    navigate("/login");
  };

  // STYLES
  const isMobile = useMediaQuery("(max-width: 960px)");
  const heading1 = {
    fontSize: "8rem",
    fontFamily: "Kaushan Script",
    padding: "5px",
    letterSpacing: "0px",
    textShadow: "4px 4px 5px rgba(0,0,0,0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
  };
  const heading2 = {
    fontSize: "3rem",
    fontFamily: "Kaushan Script",
    padding: "5px",
    letterSpacing: "0px",
    textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
    color: "black",
    display: "flex",
    alignItems: "center",
  };
  const containerStyle1 = {
    overflow: "hidden",
    display: "flex",
    padding: "20px 20px",
    marginLeft: "70px",
    marginBottom: "90px",
  };
  const containerStyle2 = {
    overflow: "hidden",
    display: "flex",
    marginTop: "20px",
    marginBottom: "10px",
    padding: "10px 5px",
  };
  const clas = {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    maxWidth: "90%",
    color: "white",
  };
  const formContainer = {
    marginLeft: isMobile ? "0px" : "120px",
    marginRight: isMobile ? "0px" : "",
    padding: "0px 50px",
    backgroundColor: "white",
    boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.6)",
    height: "100vh",
  };
  const containerImage = {
    width: "100%",
    backgroundImage: `url(${backgroundImageHeading}`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flex: "1",
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: isMobile ? "center" : "flex-start",
    alignItems: "center",
  };

  // VARIANT
  const containerVariant = {
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
        when: "beforeChildren",
        staggerChildren: 0.1,
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
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      <div style={containerImage}>
        <motion.div
          style={formContainer}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {isMobile && (
            <>
              <TextChar
                text={`Lakuin Cuy`}
                containerStyle={containerStyle2}
                textParamStyle={heading2}
              />

              <Divider />
            </>
          )}
          <div
            style={{
              marginTop: isMobile ? "70px" : "50px",
              marginBottom: "30px",
            }}
          >
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
              style={{
                marginLeft: "20px",
                marginTop: isMobile ? "0px" : "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.3rem",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  color: "black",
                }}
              >
                Register akun baru
              </Typography>
            </motion.div>
          </div>

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
                    delay: 0.2,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <TextField
                style={clas}
                onChange={handeUsernameChange}
                label="Username"
                variant="outlined"
                error={isUsernameEmpty}
                helperText={isUsernameEmpty ? "Username is required" : ""}
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
                onChange={handeEmailChange}
                label="Email"
                variant="outlined"
                error={isEmailEmpty}
                helperText={isEmailEmpty ? "Email is required" : ""}
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
            >
              <TextField
                style={clas}
                onChange={handePasswordChange}
                label="Password"
                variant="outlined"
                error={isPasswordEmpty}
                helperText={isPasswordEmpty ? "Password is required" : ""}
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
                color="secondary"
                type="submit"
              >
                Register
              </Button>
              {isLoading && <Typography>Lagi diproses...</Typography>}
              {errorMessage && <Typography>{errorMessage}</Typography>}
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
                    delay: 0.6,
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <Typography
                style={{
                  marginTop: "5px",
                  padding: "20px",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                Udah punya akun?,
                <span
                  onClick={loginButton}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary",
                  }}
                >
                  login aja sinii cuyy..
                </span>
              </Typography>
            </motion.div>
          </form>
        </motion.div>
        <div>
          <div style={{ display: isMobile ? "none" : "inline" }}>
            <TextChar
              text={`Lakuin Cuy`}
              containerStyle={containerStyle1}
              textParamStyle={heading1}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
