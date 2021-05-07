export default (time: string, minutes: number) => {
  const splitTime = time.split(':');
  const date = new Date();
  const response = [];

  date.setHours(parseInt(splitTime[0]));
  date.setMinutes(parseInt(splitTime[1]));

  date.setMinutes(date.getMinutes() - minutes);
  let min = date.getMinutes() == 0 ? '00' : '30';
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  response.push(`${hour}:${min}`);

  response.push(`${time}`);

  date.setMinutes(date.getMinutes() + minutes * 2);
  hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  min = date.getMinutes() == 0 ? '00' : '30';
  response.push(`${hour}:${min}`);

  return response;
};
