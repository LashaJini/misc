import React from "react";
import { AppBarContext } from "../../context";

const Home = () => {
  const { toggleAppBar } = React.useContext(AppBarContext);

  React.useEffect(() => {
    toggleAppBar(true);
  }, [toggleAppBar]);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
