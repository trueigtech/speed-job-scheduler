import { JOB_Rakeback, rakebackQueue } from '@src/queues/rakeback.queue'
const EVERY_FRIDAY = '0 2 * * 5'; // At 2 AM UTC every Friday

rakebackQueue.add(
  JOB_Rakeback,
  {},
  {
    jobId: JOB_Rakeback,
    removeOnComplete: 10,
    repeat: {
      cron: EVERY_FRIDAY
    }
  }
).then(() => {
  console.log('Job added to the queue! FROM CRON');
}).catch((error) => {
  console.error('Error adding job to queue:', error);
});
