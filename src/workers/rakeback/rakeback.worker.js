import db from '@src/db/models';
import { Logger } from '@src/libs/logger';
import WorkerBase from '@src/libs/workerBase';
import { RackbackService } from '@src/services/bonus/rackbackBonus/rakeback.service';

class GiveRakebackWorker extends WorkerBase {
  async run() {
    const transaction = await db.sequelize.transaction();
    try {
      const result = new RackbackService.run({}, { sequelizeTransaction: transaction });
      await transaction.commit();

      return result
    } catch (error) {
      await transaction.rollback();
      Logger.error('Error in processing GiveRakebackWorker:', { message: error });
      throw error;
    }
  }
}

export default async () => {
  const result = await GiveRakebackWorker.run();
  return result;
};
