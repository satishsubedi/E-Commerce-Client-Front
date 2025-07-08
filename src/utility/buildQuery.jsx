import qs from "qs";

export const buildQuery = ({
  mainCategory,
  maxPrice,
  minPrice,
  sale,
  colors,
  brand,
}) => {
  let queries = qs.stringify({
    mainCategory,
    maxPrice,
    minPrice,
    sale,
    colors,
    brand,
  });

  return queries;
};
