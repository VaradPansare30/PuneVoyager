// Load environment variables
require("dotenv").config();

const app = require("./app"); // import app.js

// Use dynamic port for Render
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
