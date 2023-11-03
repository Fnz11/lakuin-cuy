import { motion } from "framer-motion";
import { Grid, Container } from "@mui/material";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  const bars = [];

  for (let i = 0; i < 8; i++) {
    bars.push(
      <motion.div
        key={i} // Pastikan menambahkan prop 'key' unik saat membuat elemen dalam loop
        variants={variants}
        style={{ height: "50px", width: "7px", backgroundColor: "white", boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.5)", }}
      />
    );
  }
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      style={{ display: "flex", gap: "5px" }}
    >
     {bars}
    </motion.div>
  );
};

const AnimatedLoading = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        backgroundColor="primary"
        sx={{ p: 4 }}
      >
        <BarLoader />
      </Grid>
    </Container>
  );
};

export default AnimatedLoading;
