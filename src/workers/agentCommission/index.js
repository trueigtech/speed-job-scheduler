import path from 'path';
import { agentCommissionQueue, JOB_AGENT_COMMISSION } from '@src/queues/agentCommission.queue';

agentCommissionQueue.process(JOB_AGENT_COMMISSION, 1, path.join(__dirname, './agentCommission.worker'));
