const checkColumnUsed = (column, data) => {
  const isUsed = data.some((item) => {
    return item.name === column;
  });
  console.log(isUsed);
  return isUsed;
};

export default checkColumnUsed;