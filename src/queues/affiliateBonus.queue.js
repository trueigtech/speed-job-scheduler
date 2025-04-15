import queueWorkerRedisClient from '@src/libs/queueWorkerRedisClient'
import Bull from 'bull'
import Redis from 'ioredis'

const opts = {
  createClient: function (type, opts) {
    switch (type) {
      case 'client':
        return queueWorkerRedisClient.client
      case 'subscriber':
        return queueWorkerRedisClient.publisherClient
      default:
        return new Redis(queueWorkerRedisClient.connectionOptions)
    }
  },
  redis: queueWorkerRedisClient.connectionOptions,
  defaultJobOptions: {
    attempts: 3, // Retry 3 times if the job fails
    backoff: {
      type: 'exponential', // Use exponential backoff
      delay: 500 // Initial delay of 500ms
    },
    removeOnComplete: 100, // Keep last 100 completed jobs
    removeOnFail: 50 // Optional: Keep last 50 failed jobs
  }
}

export const affiliateBonusQueue = new Bull('AffiliateBonus-Queue', opts)
export const JOB_AFFILIATE_BONUS = 'Affiliate-Bonus'
