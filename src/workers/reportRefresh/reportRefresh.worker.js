
import WorkerBase from '@src/libs/workerBase'
import { ReportRefreshService } from '@src/services/reportrefresh/reportrefresh.service'

class ReportRefreshWorker extends WorkerBase {
  async run () {
    try {
      const result = await ReportRefreshService.execute({})

      return result
    } catch (error) {
      console.log('Error processing report refresh:', error)
      throw error
    }
  }
}

export default async () => {
  // Run the worker job
  const result = await ReportRefreshWorker.run()
  return result
}
