import { JOB_AFFILIATE_COMMISSION, affiliateCommissionQueue } from '@src/queues/affiliateCommission.queue'
// const DAILY = '0 0 * * *';
const EVERY_FRIDAY = '0 0 * * 5';

affiliateCommissionQueue.add(
  JOB_AFFILIATE_COMMISSION,
  {},
  {
    jobId: JOB_AFFILIATE_COMMISSION,
    removeOnComplete: 3,
    repeat: {
      cron: EVERY_FRIDAY
    }
  }
).then(() => {
  console.log('Job added to the queue! FROM CRON');
}).catch((error) => {
  console.error('Error adding job to queue:', error);
});
