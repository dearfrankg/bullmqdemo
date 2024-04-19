import { Job, Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const myQueue = new Queue("my-queue", {
  connection: {
    // host: REDIS_HOST,
    // port: Number(REDIS_PORT),
    // password: REDIS_PASSWORD,
  },
});

const DEFAULT_REMOVE_CONFIG = {
  removeOnComplete: {
    age: 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};

export async function addJobToQueue<T>(data: T): Promise<Job<T>> {
  return myQueue.add("job", data, {
    delay: 2000,
    removeOnComplete: true,
    removeOnFail: true,
  });
}
