import { JOB_AFFILIATE_COMMISSION, affiliateCommissionQueue } from '@src/queues/affiliateCommission.queue'
const EVERY_MINUTES = '* * * * *';

affiliateCommissionQueue.add(
  JOB_AFFILIATE_COMMISSION,
  {},
  {
    jobId: JOB_AFFILIATE_COMMISSION,
    removeOnComplete: 10,
    repeat: {
      cron: EVERY_MINUTES
    }
  }
).then(() => {
  console.log('Job added to the queue! FROM CRON');
}).catch((error) => {
  console.error('Error adding job to queue:', error);
});
