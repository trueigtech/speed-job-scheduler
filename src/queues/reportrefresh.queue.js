import Bull from 'bull'
import Redis from 'ioredis'
import queueWorkerRedisClient from '@src/libs/queueWorkerRedisClient'

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
    attempts: 1,
    backoff: 100,
    removeOnComplete: 10
  }
}
export const ReportRefreshQueue = new Bull('Report-Refresh-Queue', {
  ...opts
})
export const JOB_REPORTREFRESH = 'Report-Refresh'
