import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function PaletteMetaForm(props) {
  const [stage, setStage] = useState("form");
  const [paletteName, setPaletteName] = useState("");
  const { handleSubmit, hideForm } = props;

  const handlePaletteName = e => {
    setPaletteName(e.target.value);
  };

  const savePalette = emoji => {
    const newPalette = { paletteName: paletteName, emoji: emoji.native };
    handleSubmit(newPalette);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule(
      "isPaletteNameUnique",
      value => {
        return props.palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        );
      },
      [props.palettes]
    );
  });

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
      <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === "form"}
        aria-labelledby="form-dialog-title"
        onClose={hideForm}
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={paletteName}
              name="paletteName"
              onChange={handlePaletteName}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
