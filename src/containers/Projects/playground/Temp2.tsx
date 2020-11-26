import React from "react";

interface Props {
  handleTextChange: (event: any) => void;
}

const Temp2 = (props: Props) => {
  const { handleTextChange } = props;

  return (
    <>
      <h1>Temp2</h1>
      <input type="text" onChange={handleTextChange} />
    </>
  );
};

export default Temp2;
