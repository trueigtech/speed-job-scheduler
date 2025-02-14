import WorkerBase from '@src/libs/workerBase';
import db from '@src/db/models';
import { ReckbackService } from '@src/services/vipTier/reward/rakeback.service';

class GiveRakebackWorker extends WorkerBase {
  async run () {
    const sequelize = db.sequelize;
    const transaction = await sequelize.transaction();
    try {
      const service = new ReckbackService({ sequelize });
      const result = await service.run();
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      console.error('Error in processing GiveRakebackWorker:', error);
      throw error;
    }
  }
}

export default async () => {
  const result = await GiveRakebackWorker.run();
  return result;
};
