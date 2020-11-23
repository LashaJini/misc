import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { Box, Container } from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    div: {
      width: "100px",
      height: "100px",
      backgroundColor: red[500],
      transitionProperty: "width",
      transitionDuration: "3s",
      transitionDelay: "1s",
      "&:hover": {
        width: "300px",
      },
    },
  })
);

const Playground = () => {
  const classes = useStyles();

  return (
    <>
      <h1>Playground</h1>
      <div className={classes.div}></div>
      <Container>
        <Box my={2} mx={2}>
          {[...new Array(12)]
            .map(
              () => `Consectetur soluta sunt in inventore doloremque Perspiciatis
        pariatur architecto provident iure eum molestiae fuga minus debitis
        eligendi. Quis dolorum accusamus provident facilis aliquid Vel dolores
        labore temporibus quae nesciunt. Voluptate`
            )
            .join("\n")}
        </Box>
      </Container>
    </>
  );
};

export default Playground;
