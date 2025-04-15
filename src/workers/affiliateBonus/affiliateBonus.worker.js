import WorkerBase from '@src/libs/workerBase'
import { AffiliateCommissionService } from '@src/services/bonus/afliliateBonus/affilateBonus.service'

class AffiliateBonusWorker extends WorkerBase {
  async run () {
    try {
      // Execute the logic for handling affiliate bonus
      const result = await AffiliateCommissionService.execute({})

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default async () => {
  // Run the worker job
  const result = await AffiliateBonusWorker.run()
  return result
}
