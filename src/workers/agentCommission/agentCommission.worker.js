import WorkerBase from '@src/libs/workerBase';
import { AgentCommissionHandler } from '@src/services/agentCommission/agentCommission.service';

class AgentCommissionWorker extends WorkerBase {
  async run() {
    try {
      const result = await AgentCommissionHandler.execute({});

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default async () => {
  const result = await AgentCommissionWorker.run();
  return result
}
