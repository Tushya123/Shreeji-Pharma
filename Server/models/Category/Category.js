const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    Category: {
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

module.exports = mongoose.model("Category", CategorySchema);
