export const generateGradient = (index: number, total: number = 1) => {
  const intensity = 100 - (index / (total - 1)) * 50;
  const step = 25 / (total - 1);
  const opacity = 5 + step * index;
  return { backgroundColor: `hsla(280, 52%, ${intensity}%, ${opacity}%)` };
};
