import path from 'path';
import { rakebackQueue, JOB_Rakeback } from '@src/queues/rakeback.queue';

rakebackQueue.process(JOB_Rakeback, 1, path.join(__dirname, './rakeback.worker'));
