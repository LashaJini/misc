import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { Box, Container } from "@material-ui/core/";
import Temp1 from "./Temp1";
import Temp2 from "./Temp2";

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
  const [text2, setText2] = React.useState("");

  const handleText2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText2(event.target.value);
  };

  return (
    <>
      <h1>Playground</h1>
      <Temp1 />
      <Temp2 handleTextChange={handleText2Change} />
      <h2>{text2}</h2>
      <div className={classes.div}></div>
      <Container>
        <Box my={2} mx={2}>
          {[...new Array(20)]
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
