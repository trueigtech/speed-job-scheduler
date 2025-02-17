import db from '@src/db/models';
import { Logger } from '@src/libs/logger';
import WorkerBase from '@src/libs/workerBase';
import { RakebackService } from '@src/services/bonus/rakebackBonus/rakeback.service';

class GiveRakebackWorker extends WorkerBase {
  async run() {
    const transaction = await db.sequelize.transaction();
    try {
      const result = await RakebackService.execute({}, { sequelizeTransaction: transaction });
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
  const result = await GiveRakebackWorker.execute();
  return result;
};
