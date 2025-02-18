import Bull from 'bull'
import Redis from 'ioredis'
import queueWorkerRedisClient from '@src/libs/queueWorkerRedisClient';

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
    attempts: 10,
    backoff: 60000,
    removeOnComplete: 10
  }
}

export const affiliateCommissionQueue = new Bull('Commission-Queue', {
  ...opts
});
export const JOB_AFFILIATE_COMMISSION = 'AffiliateCommission';
