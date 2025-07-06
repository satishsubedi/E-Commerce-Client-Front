import qs from "qs";

export const buildQuery = ({
  mainCategory,
  maxPrice,
  minPrice,
  sale,
  color,
  brand,
}) => {
  let queries = qs.stringify({
    mainCategory,
    maxPrice,
    minPrice,
    sale,
    color,
    brand,
  });

  return queries;
};
