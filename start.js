const concurrently = require("concurrently");

concurrently(["npx tsx ./server.ts", "npx tsx ./bullmq/worker.ts"], {
  killOthers: ["failure", "success"],
  logWarnings: true,
});
