/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AnimatedTextCharacter = ({
  text,
  textParamStyle,
  containerStyle,
  delay,
}) => {
  if (!delay) delay = 0;
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: (delay + 0.01) * i,
        delay: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // STYLES

  return (
    <motion.span
      style={containerStyle}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters?.map((letter, index) => (
        <motion.span variants={child} key={index}>
          <Typography style={textParamStyle} variant={"h3"} component={"span"}>
            {letter === " " ? "\u00A0" : letter}
          </Typography>
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedTextCharacter;
