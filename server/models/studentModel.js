const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rollNum: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true, versionKey: false }
);

const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
