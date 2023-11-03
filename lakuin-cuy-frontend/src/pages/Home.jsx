import { motion } from "framer-motion";
import TextChar from "../Component/Framer/TextChar";
import backgroundImageHeading from "../assets/Card.png";
import backgroundImage from "../assets/backgroundNotesHeading.jpg";

import { Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const navigate = useNavigate();

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

  // STYLE
  const containerStyle = {
    overflow: "hidden",
    display: "flex",
    marginTop: "15px",
    padding: isMobile ? "7px 0px" : "15px 3px",
  };
  const heading = {
    fontSize: isMobile ? "2.3rem" : "4.5rem",
    fontFamily: "Kaushan Script",
    padding: "5px",
    letterSpacing: "0px",
    textShadow: "4px 4px 5px rgba(0,0,0,0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
  };
  const headingContainer = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`, // URL gambar latar belakang
    backgroundSize: "cover", // Mengisi seluruh konten dengan gambar latar belakang
    backgroundRepeat: "no-repeat", // Menghindari pengulangan gambar
    backgroundPosition: "center", // Posisi gambar di tengah
  };
  const containerImage = {
    width: "550px",
    marginBottom: "50px",
    marginLeft: "10px",
    backgroundImage: `url(${backgroundImageHeading})`, // URL gambar latar belakang
    backgroundSize: "cover", // Mengisi seluruh konten dengan gambar latar belakang
    backgroundRepeat: "no-repeat", // Menghindari pengulangan gambar
    // backgroundPosition: "center", // Posisi gambar di tengah
    height: "550px",
  };
  return (
    <>
      <motion.div style={headingContainer}>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          style={{
            height: isMobile ? "100%" : "500px",
            width: isMobile ? "100%" : "900px",
            marginRight: isMobile ? "0px" : "50px",
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(2px)",
            boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.6)",
            borderRadius: "4px",
            display: "flex",
            padding: isMobile ? "0px 40px" : "50px 40px",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between",
          }}
        >a
          <div style={{ width: isMobile ? "100%" : "70%", marginRight: "0px" }}>
            <TextChar
              text={`Lakuin Cuy`}
              containerStyle={containerStyle}
              textParamStyle={heading}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: isMobile ? "100%" : "400px",
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
                      delay: 0.2,
                      duration: 1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                style={{
                  marginLeft: isMobile ? "0px" : "20px",
                  marginTop: "20px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "0.9rem",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                    color: "rgba(230,230,230,1)",
                  }}
                >
                  Selamat Datang di Lakuin Cuy - To Do List Simpel buat lu!
                </Typography>
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
                style={{
                  marginLeft: isMobile ? "0px" : "20px",
                  marginTop: "20px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "0.9rem",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                    color: "rgba(230,230,230,1)",
                    overflowWrap: "break",
                  }}
                >
                  Di Lakuin Cuy, kita ngasih lu solusi buat bikin hidup lu lebih
                  tersusun cuy! Ini tuh to do list yang simpel tapi ampuh. Ga
                  perlu repot-repot, tinggal pencet-pencet aja, urusan selesai!
                </Typography>
              </motion.div>
            </div>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "30px",
                marginLeft: isMobile ? "0px" : "20px",
                marginTop: "40px",
                marginBottom: "20px",
              }}
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
              <Button
                onClick={() => navigate("/login")}
                style={{ padding: "12px 30px", width: "120px" }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                style={{ padding: "12px 30px", width: "120px" }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Register
              </Button>
            </motion.div>
          </div>
          <div style={{ width: isMobile ? "0%" : "50%", height: "500px", display: isMobile ? "none" : "inline"}}>
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
              style={containerImage}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
