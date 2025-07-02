import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "../../components/customCard/ProductCard";
import axios from "axios";

const API = "http://localhost:8001/api/v1";

const LatestProductsPage = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/latestProducts`).then((res) => {
      setLatest(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="space-y-6 h-[50vh]">
      <h2 className="text-2xl font-bold text-gray-800">Latest Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? //React pattern for rendering placeholder elements, when loading.
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-xl" />
            ))
          : //After loading, to show the actual content.
            latest.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default LatestProductsPage;
