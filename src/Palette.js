import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const { colors, paletteName, emoji, id } = props.palette;
  const { classes } = props;

  const changeLevel = level => {
    setLevel(level);
  };
  const changeFormat = val => {
    setFormat(val);
  };

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette={true}
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingAllColors
      ></Navbar>
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);
