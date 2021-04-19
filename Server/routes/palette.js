const router = require("express").Router();
let Palette = require("../models/palette");

router.route("/").get((req, res) => {
  Palette.find()
    .then((palettes) => res.json(palettes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/new").post((req, res) => {
  const paletteName = req.body.paletteName;
  const id = req.body.id;
  const emoji = req.body.emoji;
  const colors = req.body.colors;

  const newPalette = new Palette({ paletteName, id, emoji, colors });

  newPalette
    .save()
    .then(() => res.json("Palette added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Palette.find()
    .then((palette) => res.json(palette))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  // used findOneAndDelete because this is NOT finding ObjectId, rather the "url ID"
  Palette.findOneAndDelete({ id: req.params.id })
    .then(() => res.json("Palette deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
