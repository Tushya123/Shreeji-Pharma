const mongoose = require("mongoose");

const SupplierDetailSchema = new mongoose.Schema(
  {
    SupplierName: {
      type: String,
    },
    CompanyName: {
      type: String,
    },

    Country: {
      type: String,
      //   required: true,
    },

    ContactNo_Office: {
      type: Number,
      required: true,
    },
    EmailID_Office: {
      type: String,
      required: true,
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
      default: true,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierDetail", SupplierDetailSchema);
