import WorkerBase from '@src/libs/workerBase';
import { DashboardStatsHandler } from '@src/services/dashboardStats/dashboardStats.service';

class DashboardStatsWorker extends WorkerBase {
  async run() {
    try {
      const result = await DashboardStatsHandler.execute({});

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default async () => {
  const result = await DashboardStatsWorker.run();
  return result
}
