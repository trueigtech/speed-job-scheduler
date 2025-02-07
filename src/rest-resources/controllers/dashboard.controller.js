import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { affiliateCommissionQueue } from '@src/queues/affiliateCommission.queue'

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
        new BullAdapter(affiliateCommissionQueue)
      ],
      serverAdapter
    })

    serverAdapter.setBasePath('/dashboard')
    return serverAdapter.getRouter()
  }
}
