const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const userSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneno: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// let users = [
//   {
//     id: 7,
//     username: "jamesbond",
//     email: "db09@gmail.com",
//     phoneno: 8008558005,
//   },
//   {
//     id: 8,
//     username: "mrStank",
//     email: "loveyou300@gmail.com",
//     phoneno: 12345678980,
//   },
// ];

app.get("/user", (req, res) => {
  let user = {
    id: 7,
    username: "jamesbond",
    email: "db09@gmail.com",
    phoneno: 8008558005,
  };

  res.send(user);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  let user = await User.findOne({ id: id });
  if (!user) {
    res.status(404).send({ msg: "user doesn't exist" });
    return;
  }
  console.log(user);
  res.send(user);
});

app.post("/user", (req, res) => {
  let { id, username, email, phoneno } = req.body;

  //   let user = {
  //     id: id,
  //     username: username,
  //     email: email,
  //     phoneno: phoneno,
  //   };

  try {
    let user = User({
      id: id,
      username: username,
      email: email,
      phoneno: phoneno,
    });

    //   users.push(user);
    user.save();
    res.send({ msg: "user created", data: user });
    return;
  } catch (err) {
    res.status(500).send({ err: err });
  }
});

app.put("/user/:id", async (req, res) => {
  let id = req.params.id;
  let { username, email, phoneno } = req.body;

  let db_res = await User.updateOne(
    { id: id },
    {
      username: username,
      email: email,
      phoneno: phoneno,
    }
  );

  res.send({ msg: "user has been updated", data: db_res });
});

app.delete("/user/:id", async (req, res) => {
  let id = req.params.id;

  let db_res = await User.deleteOne({ id: id });

  res.send({ msg: "user deleted", data: db_res });
});

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, () => {
  app.listen(PORT, () => {
    console.log(`Server is running...${PORT}`);
  });
});
