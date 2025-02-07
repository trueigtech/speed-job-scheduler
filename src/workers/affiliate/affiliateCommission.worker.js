import WorkerBase from '@src/libs/workerBase'
import db from '@src/db/models';
import { EarnedCommissionService } from '@src/services/affiliate/earnCommission.service'

class EarnCommissionWorker extends WorkerBase {
  async run() {
    const sequelize = db.sequelize;
    const transaction = await sequelize.transaction()
    try {
      const service = new EarnedCommissionService({ sequelize });

      const result = await service.run();
      await transaction.commit()
      return result
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

export default async () => {
  const result = await EarnCommissionWorker.run();
  return result
}
