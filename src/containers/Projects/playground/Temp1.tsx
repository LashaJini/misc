import React from "react";

const Temp1 = () => {
  const [text1, setText1] = React.useState("");

  const handleText1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText1(event.target.value);
  };

  return (
    <>
      <h1>Temp1</h1>
      <h2>{text1}</h2>
      <input type="text" onChange={handleText1Change} />
    </>
  );
};

export default Temp1;
