import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { renderStars } from "../star/Star";
const reviews = [
  {
    title: "Awesome Product",
    rating: 3.5,
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero illum veniam enim. Porro sint, vitae non pariatur dolor recusandae voluptatem tenetur earum, voluptate expedita vel perferendis magni, nostrum officiis.",
    reviewedBy: "Kovid Kunduru",
    createdAt: "2025-03-20",
  },
  {
    title: "Good Product",
    rating: 2.5,
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero illum veniam enim. Porro sint, vitae non pariatur dolor recusandae voluptatem tenetur earum, voluptate expedita vel perferendis magni, nostrum officiis.",
    reviewedBy: "Prem Acharya",
    createdAt: "2025-04-20",
  },
  {
    title: "Wonderful Product",
    rating: 4,
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero illum veniam enim. Porro sint, vitae non pariatur dolor recusandae voluptatem tenetur earum, voluptate expedita vel perferendis magni, nostrum officiis.",
    reviewedBy: "Rahul Sharma",
    createdAt: "2025-02-20",
  },
];

export const Reviews = () => {
  return (
    <div className="mt-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="reviews">
          <AccordionTrigger className="text-lg font-semibold">
            Reviews ({reviews.length})
          </AccordionTrigger>

          <AccordionContent className="space-y-6 pt-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">{review.title}</h3>
                  <div className="text-sm text-gray-600">
                    {review.reviewedBy} -{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-1">{renderStars(review.rating)}</div>

                <p className="text-sm text-gray-800">{review.details}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
