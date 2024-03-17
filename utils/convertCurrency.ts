export const convertCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("kg-KG", {
    style: "currency",
    currency: "USD",
  }).format(+amount);
};
