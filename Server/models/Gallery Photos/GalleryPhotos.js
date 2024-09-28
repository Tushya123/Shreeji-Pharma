const mongoose = require("mongoose");
const GalleryPhotoSchema = new mongoose.Schema(
  {
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    metaURL: {
      type: String,
    },
    metaImage: {
      type: String,
    },

    imageURL: {
      type: String,
    },
    IsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryPhoto", GalleryPhotoSchema);
