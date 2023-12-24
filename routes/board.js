const mongoose = require('mongoose');
const Board = mongoose.model('Board');

const CreateBoard = (req, res) => {
  console.log('here');
  console.log(req.user);
  const { boardName } = req.body;

  if (!boardName) {
    return res.status(422).json({ error: 'Board name is required' });
  }

  try {
    const board = new Board({
      boardName,
      createdBy: req.user._id,
    });
    const boardResponse = board.save();
    return res.status(200).json({ message: `${boardName} Board created successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unable to create board', error: error })
  }
};

const GetAllBoard = async (req, res) => {
  const board = new Board();
  try {
    const boardResponse = await Board.find({
      createdBy: req.user._id
    })
    return res.status(200).json({ data: boardResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to get board", error: error });
  }
}

module.exports = { CreateBoard, GetAllBoard };