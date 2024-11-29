"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Card from "../ui/card";
import Button from "../ui/button";
import { Brain } from "lucide-react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { BackgroundLinesDemo } from "../BackgroundLinesDemo";
import Footer from "../layout/Footer";

interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "TWITTER" | "YOUTUBE" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  content?: string;
  createdAt: string;
}

const SharedBrainPage = () => {
  const { sharedHash } = useParams<{ sharedHash: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContents = async () => {
      try {
        const response = await axios.get(`/api/brain/${sharedHash}`);
        if (response.data.success) {
          setContents(response.data.data);
        } else {
          setError("Failed to fetch shared content");
        }
      } catch (error) {
        console.error("Error fetching shared contents:", error);
        setError("Shared hash does not exist");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContents();
  }, [sharedHash]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4">
        <div className="relative">
          {" "}
          <BackgroundLinesDemo
            title={`Second Brain of ${sharedHash}`}
            description="Second Brain is a free and open source platform for creating and sharing
        content."
            primaryBTN={
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm md:text-lg"
                  startIcon={<Brain className="w-4 h-4" />}
                >
                  Create New Brain
                </Button>
              </Link>
            }
            secondaryBTN={
              <Link href="/all-shared-links">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full text-sm md:text-lg"
                  startIcon={<BoltIcon className="w-4 h-4" />}
                >
                  All Second Brain
                </Button>
              </Link>
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:p-8 p-2 bg-gray-100">
          {contents.map((content) => (
            <Card
              key={content._id}
              {...content}
              onDelete={() => {}} // Disable delete functionality for shared content
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SharedBrainPage;
