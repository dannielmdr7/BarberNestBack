export const dateToUnix = (dateString: Date) => {
  const date = new Date(dateString);
  return date.getTime();
};

export const unixToDate = (unixTimestamp: number) => {
  return new Date(unixTimestamp * 1000);
};
