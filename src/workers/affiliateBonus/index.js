import path from 'path'
import { affiliateBonusQueue, JOB_AFFILIATE_BONUS } from '@src/queues/affiliateBonus.queue'

affiliateBonusQueue.process(JOB_AFFILIATE_BONUS, 1, path.join(__dirname, './affiliateBonus.worker'))
