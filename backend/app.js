const express = require("express");
const sequelize = require("./utils/database");
const Player = require("./models/player");

const app = express();
let cors = require("cors");
app.use(cors());

const POST = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/player/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  Player.findAll({ where: { name: name } })
    .then((players) => {
      res.status(200).json({
        success: true,
        data: players,
      });
    })
    .catch((err) => console.log(err));
});

app.post("/player", (req, res) => {
  const player = req.body;
  Player.create({
    name: player.name,
    dob: player.dob,
    photoUrl: player.photoUrl,
    birthplace: player.birthplace,
    career: player.career,
    noOfMatches: player.noOfMatches,
    score: player.score,
    fifties: player.fifties,
    hundreds: player.hundreds,
    weaket: player.weaket,
    avrage: player.avrage,
  })
    .then((result) => {
      res.status(201).json({
        message: "Player added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/deletePlayer/:name", (req, res) => {
  const { name } = req.params;
  console.log("Delete Call" + name);
  Player.destroy({ where: { name: name } })
    .then((result) => {
      res.status(201).json({
        message: "Player deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(POST, () => {
      console.log(`Server is running on port ${POST}`);
    });
  })
  .catch((err) => console.log(err));
