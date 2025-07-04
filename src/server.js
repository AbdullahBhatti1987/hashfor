// import express from 'express';
// import { startEarningCronJob } from './app/api/user/earningJob/route.js';
// import connectDB from './lib/db.js';

// const app = express();
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log("✅ MongoDB Connected");

//     // Start cron job
//     startEarningCronJob();

//     app.get("/", (req, res) => {
//       res.send("Server running with Cron Job");
//     });

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });

//   } catch (error) {
//     console.error("❌ Server Error:", error);
//   }
// };

// startServer();
