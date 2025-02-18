import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { affiliateCommissionQueue } from '@src/queues/affiliateCommission.queue'
import { rakebackQueue } from '@src/queues/rakeback.queue'

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
  static dashboard() {
    const serverAdapter = new ExpressAdapter()
    createBullBoard({
      queues: [
        new BullAdapter(affiliateCommissionQueue),
        new BullAdapter(rakebackQueue),
      ],
      serverAdapter
    })

    serverAdapter.setBasePath('/dashboard')
    return serverAdapter.getRouter()
  }
}
