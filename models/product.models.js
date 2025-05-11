const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    variants: [
      {
        name: {
          en: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
          },
          ar: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
          },
        },
        price: { type: Number, required: true, min: 0 },
        color: {
          en: { type: String },
          ar: { type: String },
        },
        image: { type: String, required: true, trim: true },
        images: [{ type: String, trim: true }],
        inStock: { type: Number, required: true, default: 0, min: 0 },
        discountPrice: { type: Number, min: 0 },
      },
    ],
    description: {
      en: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
      },
    },
    material: {
      en: { type: String },
      ar: { type: String },
    },
    brand: { type: String },
    categories: {
      main: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      sub: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    },
    orderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
