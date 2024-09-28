const mongoose = require("mongoose");
const BannerSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
    },
    Title: {
      type: String,
    },
    bannerImage: {
      type: String,
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
    IsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", BannerSchema);
