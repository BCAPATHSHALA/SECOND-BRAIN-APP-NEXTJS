"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Button from "./ui/button";
import CreateFeedbackModal from "./ui/feedbackModel";
import { useEffect, useState } from "react";
import axios from "axios";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src?: string;
  linkedinURL: string;
  twitterURL?: string;
};

export function AnimatedTestimonialsDemo() {
  const [open, setOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/feedback/get`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setFeedbacks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const testimonials: Testimonial[] = [];
  feedbacks.forEach((feedback) => {
    testimonials.push({
      quote: feedback.quote,
      name: feedback.name,
      designation: feedback.designation,
      src: feedback?.src,
      linkedinURL: feedback.linkedinURL,
      twitterURL: feedback?.twitterURL,
    });
  });

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center flex-col">
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      <div className="bg-primary w-full h-32 md:h-32 flex justify-center items-center  ">
        <Button
          variant="primary"
          size="lg"
          className="w-full h-full"
          onClick={() => setOpen(true)}
        >
          <span className="text-2xl md:text-3xl font-PaytoneOne">Give Your Feedback</span>
        </Button>
      </div>
      {/* Modal */}
      <CreateFeedbackModal
        open={open}
        onClose={() => {
          setOpen(false);
          fetchFeedbacks(); // Refresh contents after closing modal
        }}
      />
    </div>
  );
}
