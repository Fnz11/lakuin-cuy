/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import NoteCard from "../Component/NoteCard";
import { useFetchNotes } from "../hooks/Note/useFetchNotes";
import { usePatchNotes } from "../hooks/Note/usePatchNotes";
import { useDeleteNotes } from "../hooks/Note/useDeleteNotes";
import TextChar from "../Component/Framer/TextChar";
import AnimatedLoading from "../Component/Framer/AnimatedLoading";
import React, { useEffect } from "react";
import useAuthHeader from "../hooks/Auth/useAuthHeader";

function Notes() {
  // AUTH
  const { username } = useParams();
  const user = localStorage.getItem("user");
  if (!user) {
    return <div></div>;
  }
  const token = JSON.parse(user).token;
  useEffect(() => {
    useAuthHeader(token);
  }, [user]);

  const { isLoading, starNotes, notStarNotes, refetch } =
    useFetchNotes(username);

  const { patchMutation } = usePatchNotes({
    onSucces: () => {
      refetch();
    },
  });
  const { deleteMutation } = useDeleteNotes({
    onSucces: () => {
      refetch();
    },
  });

  // HANDLE CONTROL
  const handlePatch = (note) => {
    patchMutation(note);
  };
  const handleDelete = (id) => {
    deleteMutation(id);
  };

  // STYLES
  const gridContainer = {
    padding: "20px 10px",
  };
  const textParamStyle = {
    fontWeight: "bold",
    textShadow: "5px 5px 10px rgba(0,0,0,1)",
    color: "white",
    textAlign: "center",
  };
  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    display: "flex",
    fontSize: "2rem",
    padding: "5px 30px 15px 30px",
  };
  const errorAuthBack = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
  };
  const headingPopover = {
    fontSize: "8rem",
    fontFamily: "Kaushan Script",
    padding: "5px",
    letterSpacing: "0px",
    textShadow: "4px 4px 5px rgba(0,0,0,0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
  };

  // const id = open ? "simple-popover" : undefined;
  return (
    <>
      {/* <Popover
        id={id}
        open={showPopover}
        style={errorAuthBack}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <div style={{ width: "100vh", height: "70vh", display: 'flex', flexDirection: "column", margin: "70px 90px", overflow: "false", justifyContent: "space-around", alignItems: "center" }}>
        <TextChar
        text={`${username} Notes`}
        containerStyle={containerStyle}
        textParamStyle={textParamStyle}
      />
        </div>
      </Popover> */}
      <TextChar
        text={`${username} Notes`}
        containerStyle={containerStyle}
        textParamStyle={textParamStyle}
      />
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <>
          <Grid
            container
            style={gridContainer}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1.5, md: 2 }}
          >
            {starNotes?.map((note, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <NoteCard note={note} delay={i} />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            style={gridContainer}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1.5, md: 2 }}
          >
            {notStarNotes?.map((note, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <NoteCard
                  note={note}
                  delay={i}
                  handleDelete={handleDelete}
                  handlePatch={handlePatch}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Notes;
