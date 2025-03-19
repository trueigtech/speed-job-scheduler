import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";



export class DashboardStatsHandler extends BaseHandler{

  async run (){
    try{
      await db.sequelize.query('REFRESH MATERIALIZED VIEW daily_statistical_summary;')
      return { success: true }
    }
    catch(err){
      console.log('!~~~~~~~!', err)
    }
  }

}
