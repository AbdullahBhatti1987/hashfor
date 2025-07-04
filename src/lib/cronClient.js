// // lib/cronClient.js

// let counter = 0;
// const maxRuns = 60; // 60 minutes

// const interval = setInterval(async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/cron-daily", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization:
//         //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTkzOWVjYzc2MzI4NWRhMGM3OTZiMyIsImVtYWlsIjoiYWJkdWxsYWguYmhhdHRpMzQ1QGdtYWlsLmNvbSIsIm5hbWUiOiJBYmR1bGxhaCBCaGF0dGkiLCJyb2xlIjoidXNlciIsInJlZmVycmFsQ29kZSI6IkhGMzU0NzA1IiwiY29kZSI6IkhGMzU0NzA5IiwiaWF0IjoxNzUxMzAxODg3LCJleHAiOjE3NTEzMDU0ODd9.0-tZZJtHuYwzBtdbywGmDPOhYJI-ssAahwX8KgheZpI", // only if needed
//       },
//     });

//     const data = await res.json();
//     console.log(`✅ [${new Date().toLocaleTimeString()}] Response:`, data);
//   } catch (error) {
//     console.error(
//       `❌ [${new Date().toLocaleTimeString()}] Error:`,
//       error.message
//     );
//   }

//   counter++;
//   if (counter >= maxRuns) {
//     clearInterval(interval);
//     console.log("🛑 Done! Cron testing stopped after 60 minutes.");
//   }
// }, 60 * 1000); // 1 minute = 60,000 ms

// lib/cronClient.js

// scripts/startEarning.js




require("dotenv").config();
const axios = require("axios");

let counter = 0;
const maxRuns = 60;

const now = new Date();
const hour = now.getHours();
const day = now.getDay(); // 0 (Sun) - 6 (Sat)


// ✅ Allow only between 7:00 PM–7:59 PM on Mon–Fri
if (hour !== 20 || day === 0 || day === 6) {
  console.log(
    "🛑 Not allowed to run: Must be between 5PM–6PM and Mon–Fri only"
  );
  process.exit();
}

console.log("⏳ Starting Earning Cron every minute for 1 hour...");

const interval = setInterval(async () => {
  try {
    const res = await axios.post("/api/cron-daily");

    const data = res.data;
    // console.log(`✅ [${new Date().toLocaleTimeString()}] Response:`, data);
  } catch (error) {
    // console.error(
    //   `❌ [${new Date().toLocaleTimeString()}] Error:`,
    //   error.message
    // );
  }

  counter++;
  if (counter >= maxRuns) {
    clearInterval(interval);
    // console.log("🛑 Stopped after 60 minutes");
  }
}, 60 * 1000);
