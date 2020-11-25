import React from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core/";
import { AppBarContext } from "../context";
import { Link } from "react-router-dom";
import ReplyIcon from "@material-ui/icons/Reply";
import HomeIcon from "@material-ui/icons/Home";

const PageDoesNotExist = (props: any) => {
  const { toggleAppBar } = React.useContext(AppBarContext);

  React.useEffect(() => {
    toggleAppBar(false);
  }, [toggleAppBar]);

  return (
    <Box m="4rem">
      <Grid container spacing={5}>
        <Grid item container justify="center" alignItems="flex-end">
          <Typography variant="h2" component="h1">
            Page Does Not Exist... 😢
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="flex-end">
          <Button
            onClick={props.history.goBack}
            startIcon={<ReplyIcon />}
            variant="outlined"
            size="large"
          >
            Go Back
          </Button>
        </Grid>
        <Grid item container justify="center" alignItems="flex-end">
          <Typography variant="h6" component="h2">
            OR
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="flex-end">
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            endIcon={<HomeIcon />}
          >
            Go Home
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageDoesNotExist;
