import CustomCarousel from "../../components/customcarousel/CustomCarousel";
import AllProductList from "../../components/Products/AllProductList";

import LatestProducts from "../../components/Products/LatestProducts";
import RecommendationProducts from "../../components/Products/RecommendationProducts";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <CustomCarousel />

      {/* <div className="mt-10">
        <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
        <AllProductList />
      </div> */}

      <div className="mb-10">
        <RecommendationProducts />
      </div>
      <div className="mb-10">
        <LatestProducts />
      </div>
    </div>
  );
};
