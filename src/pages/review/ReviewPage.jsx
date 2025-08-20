import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa6";

import { useState } from "react";
// import { FaRegStar } from "react-icons/fa6";
import useForm from "../../hooks/useForm";

import { toast } from "react-toastify";
import { postReviewApi } from "../../features/review/reviewApi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import reviewStar from "../../utils/reviewStar";
import Rating from "../../components/star/Rating";

const ReviewPage = () => {
  const [stars, setStars] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { singleProduct } = useSelector((state) => state.productInfo);
  const { fullstarrating, halfstar, emptystars } = reviewStar(
    singleProduct.reviews
  );

  const { reviews } = useSelector((state) => state.reviewInfo);
  console.log(reviews);

  // const ref = useRef(true);
  const [hideReview, SetHideReview] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { handleOnChange, formData } = useForm();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!stars > 0) {
      return toast.error("rating is required");
    }

    if (!user._id) {
      return navigate(`/login?redirect=${location.pathname}`);
    }
    formData.rating = stars;
    formData.productId = singleProduct._id;
    formData.userId = user?._id;
    formData.name = `${user?.fName} ${user?.lName}`;

    const { status, message } = await postReviewApi(formData);
    toast[status](message);

    SetHideReview(false);
  };
  const handleOnClick = () => {
    navigate("/");
    SetHideReview(true);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex justify-between items-center w-full text-xl ">
            <div>{` Reviews(${reviews.length || 0})`}</div>
            <Rating
              fullstarrating={fullstarrating}
              halfstar={halfstar}
              emptystars={emptystars}
            ></Rating>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {hideReview ? (
            <>
              <Dialog>
                {user?._id ? (
                  <DialogTrigger className="underline underline-offset-4 ">
                    Write a Review
                  </DialogTrigger>
                ) : (
                  <Link
                    to={`/login?redirect=${location.pathname}`}
                    variant="link"
                    className="underline underline-offset-4"
                  >
                    Write a review
                  </Link>
                )}
                <DialogContent className="max-h-[85vh] px-5 mt-4 overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="">
                      <div className="text-center">
                        <h3 className="text-2xl text-blue-900">
                          Write a review
                        </h3>
                        <h1 className="text-sm text-muted-foreground">
                          Share your thoughts with the community.
                        </h1>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="">
                    <div className="wrapper text-[20px] text-black flex flex-col gap-10 mb-7">
                      <div className="flex items-center gap-6 p-4 rounded-lg shadow-md border bg-white w-full max-w-md">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={singleProduct?.thumbnail}
                            alt="product"
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-between">
                          <h4 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                            {singleProduct.brand}
                          </h4>
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                            {singleProduct.title}
                          </h3>
                          <span className="text-base font-medium text-green-600">
                            ${singleProduct.price}
                          </span>
                        </div>
                      </div>

                      <form
                        onSubmit={handleOnSubmit}
                        className="flex flex-col  gap-6"
                        action=" "
                      >
                        <div className="text-center">
                          Overall rating <span className="text-red-700">*</span>
                          <div className="flex justify-center">
                            {Array.from({ length: 5 }).map((_, index) => {
                              return (
                                <FaStar
                                  onClick={() => setStars(index + 1)}
                                  key={index}
                                  className={index < stars && "text-yellow-500"}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label>Your Review</label>
                          <textarea
                            name="comment"
                            className="border rounded"
                            rows={4}
                            onChange={handleOnChange}
                          ></textarea>
                          <small className="text-muted-foreground">
                            Describe what you liked, what you didn't like and
                            other key things shoppers should know.
                          </small>
                        </div>
                        <div className="flex flex-col">
                          <label>Review title</label>
                          <textarea
                            className="border rounded"
                            rows={2}
                            name="reviewTitle"
                            onChange={handleOnChange}
                          ></textarea>
                          <small className="text-muted-foreground">
                            Please give any review title. It will help us to
                            track review faster. Thanks
                          </small>
                        </div>

                        <h2 className="text-center">
                          Please give some feedback.Thanks
                        </h2>
                        <div>
                          <div>How did this product fit?</div>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productFitting"
                              value="Runs Small"
                              className="size-5.5 bg-gray-900"
                              onChange={handleOnChange}
                            />
                            Runs Small
                          </label>

                          <label className="flex gap-2 items-center">
                            <input
                              type="radio"
                              name="productFitting"
                              value="True to Size"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            True to Size
                          </label>

                          <label className="flex gap-2 items-center">
                            <input
                              type="radio"
                              name="productFitting"
                              value="Runs Big"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            Runs Big
                          </label>
                        </div>
                        <div>
                          <div>How comfortable was the product ?</div>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productComforatability"
                              value="Uncomforable"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            Uncomforable
                          </label>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productComforatability"
                              value="avrage"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            average
                          </label>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productComforatability"
                              value="Very Comfortable"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            Very Comfortable
                          </label>
                        </div>
                        <div>
                          <div>Would you recommend this product ?</div>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productRecommendation"
                              value="Yes"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            Yes
                          </label>

                          <label className="flex gap-2  items-center">
                            <input
                              type="radio"
                              name="productRecommendation"
                              value="No"
                              className="size-5.5"
                              onChange={handleOnChange}
                            />
                            No
                          </label>
                        </div>

                        <Button
                          type="submit"
                          variant="dark"
                          className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800 cursor-pointer active:bg-neutral-900 transition"
                        >
                          Submit Review
                        </Button>
                      </form>
                    </div>

                    {/* rating section */}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <AlertDialog open>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Thank you for your review.
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    your review may take up to one day to show in reviews.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleOnClick}>
                    Continue Shopping
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="card-wrapper"></div>
        </AccordionContent>
        <AccordionContent>
          {/* review list  */}

          {reviews?.map((review) => {
            return (
              <div className="flex items-center">
                <div>
                  <Avatar className="">{review.name}</Avatar>
                </div>
                <div className="text-center"></div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReviewPage;
