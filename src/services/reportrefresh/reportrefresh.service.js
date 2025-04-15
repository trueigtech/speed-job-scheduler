import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { AppError } from '@src/errors/app.error'

export class ReportRefreshService extends BaseHandler {
  async run () {
    try {
      // Execute the query to refresh the materialized view
      await db.sequelize.query('REFRESH MATERIALIZED VIEW daily_statistical_summary;')
      return { success: true }
    } catch (err) {
      throw new AppError('Failed to refresh the materialized view', 500, err)
    }
  }
}
