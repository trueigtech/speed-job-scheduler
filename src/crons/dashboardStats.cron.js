const { JOB_DASHBOARD_STATS, dashboardStatsQueue } = require('@src/queues/dashboardStats.queue')
const EVERY_DAY = '0 0 * * *'

dashboardStatsQueue.add(
  JOB_DASHBOARD_STATS,
  {},
  {
    jobId: JOB_DASHBOARD_STATS,
    removeOnComplete: 3,
    repeat: {
      cron: EVERY_DAY
    }
  }
).then(() => {
  console.log('Dashboard stats Job added to the queue! FROM CRON')
}).catch((error) => {
  console.error('Error adding job to queue:', error)
})

export const cronDashboardStatsInitialized = true
