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
        delay: 500 // Start with 500ms delay before retrying
    },
    removeOnComplete: 100 // Keep last 100 successful jobs for debugging
}

}
export const dashboardStatsQueue = new Bull('DashboardStats-Queue', {
  ...opts
});
export const JOB_DASHBOARD_STATS = 'DashboardStats';
