import { JOB_AFFILIATE_BONUS, affiliateBonusQueue } from '@src/queues/affiliateBonus.queue'

const EVERY_SUNDAY = '0 6 * * 0' // Every Sunday at 6:00 AM

affiliateBonusQueue.add(
  JOB_AFFILIATE_BONUS,
  {}, // you can pass data if needed here
  {
    jobId: JOB_AFFILIATE_BONUS,
    removeOnComplete: 3,
    repeat: {
      cron: EVERY_SUNDAY
    }
  }
)
  .then(() => {
    console.log('Affiliate bonus job added to the queue! FROM CRON')
  })
  .catch((error) => {
    console.error('Error adding affiliate bonus job to queue:', error)
  })

export const cronAffiliateBonusInitialized = true
