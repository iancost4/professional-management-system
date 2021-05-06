export default (validation: Array<any>, property: string) => {
  const findProperty = validation.find((item) => item.property == property);
  expect(true).toEqual(!!findProperty);
};
