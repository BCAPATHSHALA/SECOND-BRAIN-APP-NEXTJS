"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Button from "./button";
import { contentSchema, TContentSchema } from "@/schemas/content.schemas";
import toast from "react-hot-toast";
import { ContentTypes } from "@/utils/constant";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContentSchema>({
    resolver: zodResolver(contentSchema),
  });

  const onSubmit: SubmitHandler<TContentSchema> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/content/create`,
        {
          ...data,
          tags,
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
        setTags([]);
        onClose();
      } else {
        setError(response.data.message || "Failed to create content");
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred while creating content"
        );
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
      console.error("Error creating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-oxfordblue bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Content</h2>
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
                {...register("title")}
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("type")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Type</option>
                {ContentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("link")}
                type="text"
                placeholder="Link (optional)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.link && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.link.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("content")}
                placeholder="Content (optional)"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                className="w-full p-2 border border-gray-300 rounded-md"
                onKeyPress={handleAddTag}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Content"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
