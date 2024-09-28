const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema(
  {
    ProductDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productgroup",
    },
    Description: {
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

    ImageUrl: {
      type: String,
    },
    ProductDetailDescription: [
      {
        ProductKey: {
          type: String,
        },
        ProductValue: {
          type: String,
        },
      },
    ],
    IsActive: {
      type: Boolean,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productdetail", ProductDetailSchema);
