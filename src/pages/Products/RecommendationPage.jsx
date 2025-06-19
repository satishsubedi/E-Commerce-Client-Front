import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../../components/customCard/ProductCard";
const API = "http://localhost:8001/api/v1";

const RecommendationPage = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      axios.get(`${API}/recommendations/${productId}`).then((res) => {
        setRecommendations(res.data);
        setLoading(false);
      });
    }
  }, [productId]);

  if (!productId) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recommended Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? //React pattern for rendering placeholder elements, when loading.
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          : //After loading, to show the actual content.
            recommendations.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};
export default RecommendationPage;
