"use client";

import { useState, useEffect } from "react";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import CreateContentModal from "@/components/ui/createContentModal";
import Sidebar from "@/components/ui/sidebar";
import ShareBrainModal from "@/components/ui/shareBrainModel";
import toast from "react-hot-toast";

interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "TWITTER" | "YOUTUBE" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  content?: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get(`/api/content/get`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setContents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/content/delete`, {
        data: { contentId: id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setContents(contents.filter((content) => content._id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-seasalt p-4 sm:p-6 md:p-8 md:ml-64">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mb-8">
          <Button
            startIcon={<ShareIcon className="w-4 h-4" />}
            variant="secondary"
            size="md"
            onClick={() => setOpenShareModal(true)}
          >
            Share Brain
          </Button>
          <Button
            startIcon={<PlusIcon className="w-4 h-4" />}
            variant="primary"
            size="md"
            onClick={() => setOpen(true)}
          >
            Add Content
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {contents.map((contentD) => (
            <Card
              key={contentD._id}
              {...contentD}
              onDelete={handleDelete}
              loading={loading}
            />
          ))}
        </div>

        {/* Modal */}
        <CreateContentModal
          open={open}
          onClose={() => {
            setOpen(false);
            fetchContents(); // Refresh contents after closing modal
          }}
        />
        <ShareBrainModal
          open={openShareModal}
          onClose={() => setOpenShareModal(false)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
