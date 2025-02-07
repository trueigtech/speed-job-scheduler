import path from 'path';
import { affiliateCommissionQueue, JOB_AFFILIATE_COMMISSION } from '@src/queues/affiliateCommission.queue';

affiliateCommissionQueue.process(JOB_AFFILIATE_COMMISSION, 1, path.join(__dirname, './affiliateCommission.worker'));
