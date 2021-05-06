export default (day: number) => {
  const weekday = new Array(7);
  weekday[0] = 'SUNDAY';
  weekday[1] = 'MONDAY';
  weekday[2] = 'TUESDAY';
  weekday[3] = 'WEDNESDAY';
  weekday[4] = 'THURSDAY';
  weekday[5] = 'FRIDAY';
  weekday[6] = 'SATURDAY';

  return weekday[day];
};
