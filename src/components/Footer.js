import React from "react";

const Footer = () => {
  const footer = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2.5vw",
    width: "100vw",
    backgroundColor: "black",
    color: "#094d92",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={footer}>
      Created by&nbsp;
      <a
        href="https://ShaqEd92.github.io"
        target="blank"
        style={{ color: "#95e06c" }}
      >
        Shaquille Edwards
      </a>
    </div>
  );
};

export default Footer;
