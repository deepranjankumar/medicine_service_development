const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require("socket.io");

const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://medicine-service-development-4.onrender.com/", // Ensure this matches your frontend's URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// CORS configuration
app.use(cors({
  origin: "https://medicine-service-development-4.onrender.com/",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Define Mongoose schema and model
// Correct the schema to use lowercase for 'fare'
const ambulanceSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  Fare: { type: String, required: true }, // Ensure 'Fare' matches here
  status: { type: String },
  date: { type: String, required: true },
  mail: { type: String, required: true }
});

const ambulance_model = new mongoose.model("ambulance", ambulanceSchema);

app.post('/ambulance-book', (req, res) => {
  console.log('Received request:', req.body);
  const { from, to, Fare, date, status } = req.body;

  if (!from || !to || !Fare) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  ambulance_model.create(req.body)
    .then((savedAppointment) => {
      console.log('Ambulance data saved:', savedAppointment);
      res.status(201).json({ status: 'success', data: savedAppointment });
    })
    .catch((error) => {
      console.error('Error saving appointment:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save appointment.', error: error.message });
    });
});





app.get('/api/ambulance_details/:mail', async (req, res) => {
  try {
    const Appointment = await ambulance_model.find({ mail: req.params.mail });
    if (!Appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(Appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: [0, 'Age cannot be negative']
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  mail:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  status:'',
  docName:'',                                                               
    docSpec:'',
    docConsfee:'',
    docLoc:'',
});

const appointment = mongoose.model("appointments", usersSchema);

// Define routes
app.use("/", authRoutes); // Ensure authRoutes is set up correctly

app.post('/appoint', (req, res) => {
  const { name, gender, address, age, phone} = req.body;

  if (!name || !gender || !address || !age || !phone) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  appointment.create(req.body)
    .then((savedAppointment) => {
      console.log('Appointment saved:', savedAppointment);
      res.status(201).json({ status: 'success', data: savedAppointment });
    })
    .catch((error) => {
      console.error('Error saving appointment:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save appointment.', error: error.message });
    });
});


// Assume your endpoint for fetching appointment details by email
app.get('/api/appointment/:mail', async (req, res) => {

  try {
      const Appointment = await appointment.find({ mail: req.params.mail });
      if (!Appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(Appointment);
  } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



// Socket.io configuration
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
