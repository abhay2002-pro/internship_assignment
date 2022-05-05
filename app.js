const express = require("express");
const app = express();

const axios = require("axios");
require("dotenv").config();

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/todo", async (req, res) => {
  let data = [];
  let store;
  await axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      store = response.data;
      store.forEach((element) => {
        data.push({
          id: element.id,
          title: element.title,
          completed: element.completed,
        });
      });
      res.json(data);
    })
    .catch((err) => res.send(err));
});

app.get("/user/:id", async (req, res) => {
  let datauser = {};
  let datatodo = [];
  let storeuser;
  await axios
    .get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
    .then((response) => {
      datauser.id = response.data.id;
      datauser.name = response.data.name;
      datauser.email = response.data.email;
      datauser.phone = response.data.phone;
    })
    .catch((err) => res.send(err));

  await axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      storeuser = response.data;
      storeuser.forEach((element) => {
        if (element.userId == req.params.id) {
          datatodo.push(element);
        }
      });
      datauser.todo = datatodo;
    })
    .catch((err) => res.send(err));
  res.json(datauser);
});

app.get("*", (req, res) => {
  res.status(404).send("404 Error");
});

app.listen(3000 || process.env.PORT, () => console.log("Server running at port 3000.."));
