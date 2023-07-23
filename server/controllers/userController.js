const Students = require("../models/studentModel");

const createStudent = async (req, res) => {
  try {
    const { name, rollNum } = req.body;
    const studentExists = await Students.findOne({ rollNum });

    if (studentExists) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const studentDoc = await Students.create({
      name,
      rollNum,
    });

    return res.status(200).json(studentDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const students = await Students.find({});
    if (students) {
      return res.status(200).json(students);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const {id} = req.params;
    const studentDoc = await Students.findOne({_id : id});

    if (!studentDoc) {
      return res.status(404).json({ message: "Student does not exists" });
    }

    await Students.deleteOne({ _id: id });
    return res.status(200).json({message:"Student deleted"})
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const increaseCount = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const students = await Students.find({ _id: { $in: studentIds } });

    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'Students not found' });
    }

    for (const student of students) {
      student.count += 1;
      await student.save();
    }

    res.status(200).json({ message: 'Counts increased successfully', students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error in increasing counts' });
  }
};

const decreaseCount = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const students = await Students.find({ _id: { $in: studentIds } });

    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'Students not found' });
    }

    for (const student of students) {
      student.count -= 1;
      await student.save();
    }

    res.status(200).json({ message: 'Counts decreased successfully', students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error in decreasing counts' });
  }
};


module.exports = {
  createStudent,
  getAllStudent,
  deleteStudent,
  increaseCount,
  decreaseCount,
};
