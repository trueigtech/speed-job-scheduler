import WorkerBase from '@src/libs/workerBase';
import { AffiliateCommissionService } from '@src/services/bonus/afliliateBonus/affilateBonus.service';

class AffiliateCommissionWorker extends WorkerBase {
  async run() {
    try {
      const result = await AffiliateCommissionService.run({});

      return result
    } catch (error) {
      throw error
    }
  }
}

export default async () => {
  const result = await AffiliateCommissionWorker.run();
  return result
}
