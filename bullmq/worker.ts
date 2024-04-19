// worker.ts
import { Job, Worker } from "bullmq";
import dotenv from "dotenv";
import path from "path";

const processorPath = path.join(__dirname, "job-processor.ts");

dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

let worker: Worker;

export function setUpWorker(): void {
  worker = new Worker("my-queue", processorPath, {
    connection: {
      // host: REDIS_HOST,
      // port: Number(REDIS_PORT),
      // password: REDIS_PASSWORD,
    },
    autorun: true,
    concurrency: 2,
  });

  worker.on("completed", (job: Job, returnvalue: "DONE") => {
    console.debug(`Completed job with id ${job.id}`, returnvalue);
  });

  worker.on("active", (job: Job<unknown>) => {
    console.debug(`Completed job with id ${job.id}`);
  });
  worker.on("error", (failedReason: Error) => {
    console.error(`Job encountered an error`, failedReason);
  });
}

setUpWorker();
