const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const lightingRouter = require("./lightningRouter");
const { connect } = require("./lnd");

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/lightning", lightingRouter);

// Connect to LND
connect();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
