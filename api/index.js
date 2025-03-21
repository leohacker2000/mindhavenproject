const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const cors = require("cors");
const path = require("path");


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

app.use("/images",express.static(path.join(__dirname,"public/images")));


 
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:3001", credentials: true })); 
app.use(express.static("public"));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "public/images");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});



const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log("Uploaded file:", req.file); 
    return res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ error: "File Upload Failed", details: err });
  }
});

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3001", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
});



let onlineUsers = [];


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("addUser", (userId) => {
    console.log("Adding user:", userId);
  
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
  
    if (userId) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
  
    console.log("Updated onlineUsers:", onlineUsers);
    io.emit("getUsers", onlineUsers);
  });
  
  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", onlineUsers);
  });
});






app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);







app.listen(8800, () => {
  console.log("backend Server is running");

});

