import Queue from 'bull';
import Redis from 'ioredis'
import queueWorkerRedisClient from '@src/libs/queueWorkerRedisClient';

const opts ={
  createClient: function (type, opts) {
    switch (type) {
      case 'client':
        return queueWorkerRedisClient.client
      case 'subscriber':
        return queueWorkerRedisClient.publisherClient
      default:
        return new Redis(opts)
    }
  },
  redis: queueWorkerRedisClient.connectionOptions,
  defaultJobOptions: {
    attempts: 10,
    backoff: 60000,
    removeOnComplete: 10
  }
}

export const JOB_AFFILIATE_COMMISSION = 'AffiliateCommission';
export const affiliateCommissionQueue = new Queue('Commission-Queue', {
  ...opts
});
