import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

function SingleColorPalette(props) {
  const _shades = gatherShades(props.palette, props.colorId);
  const [format, setFormat] = useState("hex");
  const { paletteName, emoji, id } = props.palette;
  const { classes } = props;
  const changeFormat = val => {
    setFormat(val);
  };
  const colorBoxes = _shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

const gatherShades = (palette, colorToFilterBy) => {
  let shades = [];
  let allColors = palette.colors;
  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter(color => color.id === colorToFilterBy)
    );
  }
  //return all shades of given colors
  return shades.slice(1);
};

export default withStyles(styles)(SingleColorPalette);
