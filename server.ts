import express, { NextFunction } from "express";
import { addJobToQueue } from "./bullmq/queue";
import { setupBullBoard } from "./bullmq/bull-board";

const serverAdapter = setupBullBoard();

const app = express();
const port = 3000;
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Express server is running.");
});

app.post("/addJob", async (req, res, next: NextFunction) => {
  const { jobData } = req.body;

  try {
    const job = await addJobToQueue(jobData);
    res.json({ jobId: job.id });
    return next();
  } catch (error) {
    console.error(`Error adding job to the queue: ${error}`);
    res.status(500).send("Failed to add job to the queue.");
  }
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  console.log(`Admin queues listening at http://localhost:${port}/admin/queues`);
});
