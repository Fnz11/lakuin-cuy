import { motion } from "framer-motion";
import TextChar from "../Component/Framer/TextChar";
import backgroundImage from "../assets/backgroundNotesHeading.jpg";

import { Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Error() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser);

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
    width: "100%",
    justifyContent: "center",
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
  return (
    <>
      <motion.div style={headingContainer}>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          style={{
            height: isMobile ? "100%" : "auto",
            width: isMobile ? "100%" : "50%",
            marginRight: isMobile ? "0px" : "50px",
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(2px)",
            boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.6)",
            borderRadius: "4px",
            display: "flex",
            padding: isMobile ? "0px 40px" : "50px 80px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          a
          <div>
            <TextChar
              text={`Lakuin Cuy`}
              containerStyle={containerStyle}
              textParamStyle={heading}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                    color: "rgba(230,230,230,1)",
                  }}
                >
                  Waduh, Terjadi Kesalahan! 😕
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
                  Oops, sepertinya kita tersesat di dunia maya! Halaman yang lu
                  cari kayaknya ilang deh. Ini mungkin disebabkan oleh:
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
                  - URL yang lu masukin itu salah
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
                  - Ada masalah teknis, jadi kita bingung juga.
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
                  Halaman yang lu incar lagi pada liburan, alias gak tersedia.
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
                  {user.username
                    ? "Yuk, nggak usah galau. Lu bisa balik ke note buat nyari halaman lain yang lu butuhin. Atau mau login ke akun lain"
                    : "lu belum login nih, Mau masuk atau daftar dulu? 😅"}
                </Typography>
              </motion.div>
            </div>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
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
              {user.username ? (
                <>
                  <Button
                    onClick={() => navigate(`/${user.username}/notes`)}
                    style={{ padding: "12px 30px", width: "120px" }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    notes
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    style={{ padding: "12px 30px", width: "120px" }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Error;
