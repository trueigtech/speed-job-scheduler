import { JOB_REPORTREFRESH, ReportRefreshQueue } from '@src/queues/reportrefresh.queue'

const EVERY_DAY_AT_3AM = '0 0 * * *' // Runs every day at 00:00 AM UTC

ReportRefreshQueue.add(
  JOB_REPORTREFRESH,
  {},
  {
    jobId: JOB_REPORTREFRESH,
    removeOnComplete: 3,
    repeat: {
      cron: EVERY_DAY_AT_3AM
    }
  }
).then(() => {
  console.log('Report Refresh Job added to the queue! FROM CRON')
}).catch((error) => {
  console.error('Error adding report refresh job to queue:', error)
})

export const cronReportRefreshInitialized = true
