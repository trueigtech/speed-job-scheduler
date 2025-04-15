import path from 'path'
import { ReportRefreshQueue, JOB_REPORTREFRESH } from '@src/queues/reportrefresh.queue'

ReportRefreshQueue.process(JOB_REPORTREFRESH, 1, path.join(__dirname, './reportRefresh.worker'))
