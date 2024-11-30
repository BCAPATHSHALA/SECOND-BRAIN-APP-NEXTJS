import {
  DocumentIcon,
  ShareIcon,
  TrashIcon,
  LinkIcon,
  HashtagIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import { TwitterIcon, YoutubeIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface CardProps {
  _id: string;
  title: string;
  link?: string;
  type: "TWITTER" | "YOUTUBE" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  createdAt: string;
  onDelete: (id: string) => void;
  content?: string;
  loading?: boolean;
}

const Card = ({
  _id,
  title,
  link,
  type,
  tags,
  content,
  createdAt,
  onDelete,
  loading,
}: CardProps) => {
  const getIcon = () => {
    switch (type) {
      case "TWITTER":
        return <TwitterIcon className="w-6 h-6 flex-shrink-0 text-blue-400" />;
      case "YOUTUBE":
        return <YoutubeIcon className="w-6 h-6 flex-shrink-0 text-red-500" />;
      case "DOCUMENT":
        return (
          <DocumentIcon className="w-6 h-6 flex-shrink-0 text-yellow-500" />
        );
      case "LINK":
        return <LinkIcon className="w-6 h-6 flex-shrink-0 text-green-500" />;
      case "TAG":
        return (
          <HashtagIcon className="w-6 h-6 flex-shrink-0 text-purple-500" />
        );
      case "CONTENT":
        return (
          <NewspaperIcon className="w-6 h-6 flex-shrink-0 text-gray-500" />
        );
      default:
        return (
          <DocumentIcon className="w-6 h-6 flex-shrink-0 text-battleshipgray" />
        );
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {getIcon()}
            <h2 className="text-lg font-semibold text-oxfordblue truncate">
              {title}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {link && (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-battleshipgray hover:text-mediumslateblue transition-colors duration-300"
              >
                <ShareIcon className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => onDelete(_id)}
              className="text-battleshipgray hover:text-red-500 transition-colors duration-300"
              aria-label="Delete"
              disabled={loading || false}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-grow">
          {type === "YOUTUBE" && link && (
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={link.replace("watch?v=", "embed/")}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-md border-mediumslateblue border-2"
              ></iframe>
            </div>
          )}

          {type === "TWITTER" && link && (
            <div className="twitter-embed mb-4">
              <blockquote className="twitter-tweet" data-dnt="true">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {content && (
            <pre className="mt-4 p-3 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
              {content}
            </pre>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-secondary text-primary text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
          </div>
          <p className="text-xs text-battleshipgray">
            Added on {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
