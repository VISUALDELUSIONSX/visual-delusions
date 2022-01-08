export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

export const replaceUndefinedValues = (obj: { [key: string]: any }) => {
  const newObj = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) newObj[key] = null;
  });
  return newObj;
};
