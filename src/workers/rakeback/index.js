import path from 'path';
import { rakebackQueue, JOB_RAKEBACK } from '@src/queues/rakeback.queue';

rakebackQueue.process(JOB_RAKEBACK, 1, path.join(__dirname, './rakeback.worker'));
