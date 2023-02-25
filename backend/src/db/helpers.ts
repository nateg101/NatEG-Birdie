
export function eventQueryBuilder(start: string, end: string ): string {
let dbQuery = 'SELECT payload FROM events'

    if(start) {
      dbQuery = `${dbQuery} WHERE timestamp > STR_TO_DATE('${start}','%Y-%m-%d %H:%i:%s')`
    } 

    if(end) {
      if(start) {
        dbQuery =`${dbQuery} AND timestamp < STR_TO_DATE('${end}','%Y-%m-%d %H:%i:%s')`
      } else {
        dbQuery =`${dbQuery} WHERE timestamp < STR_TO_DATE('${end}','%Y-%m-%d %H:%i:%s')`
      }
    }

    dbQuery = `${dbQuery} ORDER BY timestamp DESC`

    return dbQuery
}