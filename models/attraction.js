const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

//https://res.cloudinary.com/dboytlu1p/image/upload/v1636848479/YelpCamp/xrga7jghkj1jpjtqxggh.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const AttractionSchema = new Schema(
  {
    title: String,
    image: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    category: {
      type: String,
      enum: ["Restaurant", "Bar", "Club", "Activity"],
      required: true,
    },
  },
  opts
);

AttractionSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/Attractions/${this._id}">${this.title}</a></strong>`;
});

AttractionSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

module.exports = mongoose.model("Attraction", AttractionSchema);
