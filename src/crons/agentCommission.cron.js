const { JOB_AGENT_COMMISSION, agentCommissionQueue } = require("@src/queues/agentCommission.queue");
const EVERY_SUNDAY = '0 6 * * 0';

agentCommissionQueue.add(
  JOB_AGENT_COMMISSION,
  {},
  {
    jobId: JOB_AGENT_COMMISSION,
    removeOnComplete: 3,
    repeat: {
      cron: EVERY_SUNDAY
    }
  }
).then(() => {
  console.log('Agent commission Job added to the queue! FROM CRON');
}).catch((error) => {
  console.error('Error adding job to queue:', error);
});
