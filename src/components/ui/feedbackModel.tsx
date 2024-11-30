"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Button from "./button";
import { feedbackSchema, TFeedbackSchema } from "@/schemas/feedback.schemas";
import toast from "react-hot-toast";

interface CreateFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFeedbackModal = ({ open, onClose }: CreateFeedbackModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit: SubmitHandler<TFeedbackSchema> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/feedback/create`,
        {
          ...data,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        onClose();
      } else {
        setError(response.data.message || "Failed to create feedback");
      }
    } catch (error) {
      console.error("Error creating feedback:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred while creating feedback"
        );
        toast.error(error.response?.data?.message);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-oxfordblue bg-opacity-50 flex justify-center items-center p-4 z-20">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Give Your Feedback</h2>
            <Button
              startIcon={<XMarkIcon className="w-5 h-5" />}
              variant="secondary"
              size="sm"
              onClick={onClose}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("designation")}
                type="text"
                placeholder="Designation"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.designation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.designation.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("src")}
                type="text"
                placeholder="Image URL (optional)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.src && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.src.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("twitterURL")}
                type="text"
                placeholder="Twitter URL (optional)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.twitterURL && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.twitterURL.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("linkedinURL")}
                type="text"
                placeholder="Linkedin URL"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.linkedinURL && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.linkedinURL.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("quote")}
                placeholder="please give your valueable feedback"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
              {errors.quote && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quote.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Giving Feedback..." : "Give Feedback"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedbackModal;
