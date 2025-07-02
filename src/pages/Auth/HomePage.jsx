import CustomCarousel from "../../components/customcarousel/CustomCarousel";
import LatestProductsPage from "../Products/LatestProductsPage";
import RecommendationPage from "../Products/RecommendationPage";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <CustomCarousel />
      <LatestProductsPage />
      <RecommendationPage />
    </div>
  );
};
