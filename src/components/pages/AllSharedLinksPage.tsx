/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Button from "../ui/button";
import { format } from "date-fns";
import { Brain, ExternalLink } from "lucide-react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { BackgroundLinesDemo } from "../BackgroundLinesDemo";
import Footer from "../layout/Footer";

interface SharedLink {
  _id: string;
  hash: string;
  userId: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

const SharedLinkListingPage = () => {
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedLinks = async () => {
      try {
        const response = await axios.get(`/api/brain/all-shared-links`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setSharedLinks(response.data.data);
        } else {
          setError("Failed to fetch shared links");
        }
      } catch (error) {
        console.error("Error fetching shared links:", error);
        setError("An error occurred while fetching shared links");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedLinks();
  }, []);

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
        <BackgroundLinesDemo
          title={`All Second Brain Links`}
          description="Share your Second Brain with the world"
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
            <Link href="/">
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-sm md:text-lg"
                startIcon={<BoltIcon className="w-4 h-4" />}
              >
                Back to Second Brain
              </Button>
            </Link>
          }
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8 p-2 bg-gray-100">
          {sharedLinks.map((link) => (
            <div key={link._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 text-mediumslateblue">
                {link.userId.username}'s Brain -{" "}
                <span className="text-battleshipgray">{link.hash}</span>
              </h2>
              <p className="text-xs text-battleshipgray mb-8">
                Added on {format(new Date(link.createdAt), "MMM dd, yyyy")}
              </p>
              <Link href={`/shared/${link.hash}`}>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  startIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Open Brain
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default SharedLinkListingPage;
