import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
  const fullstar = 2;
  const emptsatr = 5 - fullstar;

  return (
    <Dialog className>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-h-screen px-5 mt-10 overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="">
            <div>Write a review</div>
            <small className="text-muted-foreground">
              Share your thoughts with the community.
            </small>
          </DialogTitle>
          <DialogDescription className="">
            <div className="wrapper text-[20px]   text-black flex flex-col gap-10 mb-7">
              <div className="flex gap-10">
                <div>
                  <img src="" alt="product image" />
                </div>
                <div>product title</div>
              </div>
              <form
                className="flex flex-col  gap-6"
                action="
            
            "
              >
                <div>
                  Overall rating <span className="text-red-700">*</span>
                  <div className="flex">
                     <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <label>
                    Your Review <span className="text-red-700">*</span>
                  </label>
                  <textarea className="border" rows={6}></textarea>
                  <small className="text-muted-foreground">
                    Describe what you liked, what you didn't like and other key
                    things shoppers should know. Minimum 30 characters.
                  </small>
                </div>
                <div className="flex flex-col">
                  <label>
                    Review title <span className="text-red-700">*</span>
                  </label>
                  <textarea className="border" rows={3}></textarea>
                  <small className="text-muted-foreground">
                    Summarise your review in 150 characters or less.
                  </small>
                </div>
                <div>
                  <div>
                    How did this product fit?
                    <span className="text-red-700 ml-2">*</span>
                  </div>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productFitting"
                      value="Runs Small"
                      className="size-5.5 bg-gray-900"
                    />
                    Runs Small
                  </label>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productFitting"
                      value="True to Size"
                      className="size-5.5"
                    />
                    True to Size
                  </label>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productFitting"
                      value="Runs Big"
                      className="size-5.5"
                    />
                    Runs Big
                  </label>
                </div>
                <div>
                  <div>
                    How comfortable was the product ?
                    <span className="text-red-700 ml-2">*</span>
                  </div>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productComforatability"
                      value="Uncomforable"
                      className="size-5.5"
                    />
                    Uncomforable
                  </label>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productComforatability"
                      value="avrage"
                      className="size-5.5"
                    />
                    average
                  </label>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productComforatability"
                      value="Very Comfortable"
                      className="size-5.5"
                    />
                    Very Comfortable
                  </label>
                </div>
                <div>
                  <div>
                    Would you recommend this product ?
                    <span className="text-red-700 ml-2">*</span>
                  </div>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productRecommendation"
                      value="Yes"
                      className="size-5.5"
                    />
                    Yes
                  </label>

                  <label className="flex gap-2  items-center">
                    <input
                      type="radio"
                      name="productRecommendation"
                      value="No"
                      className="size-5.5"
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPage;
