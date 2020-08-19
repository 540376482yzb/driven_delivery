var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./key.json"),
  databaseURL: "https://drivendelivery-8e607.firebaseio.com",
});

var db = admin.database();
var ref = db.ref("/game_state");

router.post("/save", async function (req, res, next) {
  ref.set({
    colorScheme: req.body.colorScheme,
    shape: req.body.shape,
    turn: req.body.turn,
    position: req.body.position,
    size: req.body.size,
  });
  res.json({ message: "save" });
});

router.post("/clear", async (req, res, next) => {
  ref.set(null);
  res.json({ message: "reset" });
});

router.get("/state", async (req, res, next) => {
  ref.once("value", (data) => {
    res.json(data.val());
  });
});

module.exports = router;
