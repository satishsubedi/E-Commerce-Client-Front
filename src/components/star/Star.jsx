import { Star, StarHalf } from "lucide-react";
import { IoStarOutline } from "react-icons/io5";
export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating); // e.g. 4.5 → 4 full stars
  const hasHalfStar = rating % 1 >= 0.5; // half star if 0.5+

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
      />
    );
  }

  // Fill remaining with empty stars
  const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
  for (let i = totalStars; i < 5; i++) {
    stars.push(
      <IoStarOutline key={`empty-${i}`} className="w-4 h-4 text-shadow-black" />
    );
  }

  return stars;
};
