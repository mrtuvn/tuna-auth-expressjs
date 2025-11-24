const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// routes import
const authRoute = require("./src/routes/auth");
const usersRoute = require("./src/routes/users");
const membersRoute = require("./src/routes/members");
const photosRoute = require("./src/routes/photos");
const todosRoute = require("./src/routes/todos");

dotenv.config();
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => res.send("API is running"));

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.catch((error) => console.log("Connect Fail:", error));

//use route
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/member", membersRoute);
app.use("/api/photo", photosRoute);
app.use("/api/todo", todosRoute);

app.listen(PORT, () => {
	console.log(`server is up and running at ${PORT}`);
});
