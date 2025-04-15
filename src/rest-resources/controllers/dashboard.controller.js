import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { affiliateBonusQueue } from '@src/queues/affiliateBonus.queue'
import { dashboardStatsQueue } from '@src/queues/dashboardStats.queue'
import { ReportRefreshQueue } from '@src/queues/reportrefresh.queue'

/**
 *
 *
 * @export
 * @class DashboardController
 */
export default class DashboardController {
  /**
   *
   *
   * @static
   * @return {object}
   * @memberof DashboardController
   */
  static dashboard () {
    const serverAdapter = new ExpressAdapter()
    createBullBoard({
      queues: [
        new BullAdapter(dashboardStatsQueue),
        new BullAdapter(affiliateBonusQueue),
        new BullAdapter(ReportRefreshQueue)
      ],
      serverAdapter
    })

    serverAdapter.setBasePath('/dashboard')
    return serverAdapter.getRouter()
  }
}
