import path from 'path';
import { dashboardStatsQueue, JOB_DASHBOARD_STATS } from '@src/queues/dashboardStats.queue';

dashboardStatsQueue.process(JOB_DASHBOARD_STATS, 1, path.join(__dirname, './dashboardStats.worker'));
