
export function parseEventType(eventType: string): string {
  //will just remove '_' for now but this may need to be expanded
  return eventType.replaceAll('_', ' ');
}

export function formatTimeStamp(timestamp: string): string {
  const formattedTime = new Date(Date.parse(timestamp));

  const hours = formattedTime.getHours();
  const mins = formattedTime.getMinutes().toString();
  const formattedMins = mins.length === 1 ? `0${mins}` : mins;
  return `${hours}: ${formattedMins}`;
}

export  function constructGetEventsCall(startDate: string | undefined, endDate: string | undefined): string {
  const startQuery = startDate ? `start=${startDate}` : null
  const endQuery = endDate ? `end=${endDate}` : null
  let endpoint = 'http://localhost:8000/events'
  let queryParams 

 if (endQuery && startQuery) {
    queryParams = `${startQuery}&${endQuery}`
  } 

  if(startQuery && !endQuery) {
    queryParams = startQuery
  }

  if(endQuery && !startQuery) {
    queryParams = endQuery
  }

  if(queryParams) {
    endpoint = `${endpoint}?${queryParams}`
  }

  return endpoint
}
