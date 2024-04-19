import { Job } from "bullmq";

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t * 1000));

module.exports = async function jobProcessor(job: Job): Promise<"DONE"> {
  for (let i = 0; i <= 100; i += 2) {
    await sleep(Math.random());
    await job.updateProgress(i);
    await job.log(`Processing job at interval ${i}`);

    if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
  }
  return "DONE";
};
