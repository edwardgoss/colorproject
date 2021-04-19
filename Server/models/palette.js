const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paletteSchema = new Schema({
  paletteName: { type: String, required: true },
  id: { type: String, required: true },
  emoji: { type: String, required: true },
  colors: { type: Schema.Types.Mixed, required: true }
});

const Palette = mongoose.model("Palette", paletteSchema);

module.exports = Palette;
