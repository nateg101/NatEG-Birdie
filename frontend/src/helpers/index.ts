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
