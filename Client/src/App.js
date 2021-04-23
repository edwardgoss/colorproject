import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";

function App() {
  const [palettes, setPalettes] = useState([] || seedColors);

  const findPalette = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };
  const savePalette = (newPalette) => {
    axios.post("http://104.236.216.82:5000/palette/new");
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id) => {
    console.log(id);
    axios.delete("http://104.236.216.82:5000/palette/" + id);
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  useEffect(() => {
    // window.localStorage.setItem("palettes", JSON.stringify(palettes));
    axios
      .get("http://104.236.216.82:5000/palette/")
      .then((response) => {
        setPalettes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [palettes]);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => (
          <NewPaletteForm
            savePalette={savePalette}
            palettes={palettes}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList
            palettes={palettes}
            deletePalette={deletePalette}
            {...routeProps}
          />
        )}
      />
      <Route
        render={(routeProps) => (
          <PaletteList
            palettes={palettes}
            deletePalette={deletePalette}
            {...routeProps}
          />
        )}
      />
    </Switch>
  );
}

export default App;
