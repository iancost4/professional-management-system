export default (date: string) => {
  const splitDate = date.split('/');
  return new Date(
    parseInt(splitDate[2]),
    parseInt(splitDate[1]) - 1,
    parseInt(splitDate[0]),
  );
};
