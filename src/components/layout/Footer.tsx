import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";

const socialLinks: { url: string; icon: ReactElement }[] = [
  {
    url: "https://x.com/manojofficialmj",
    icon: (
      <TwitterIcon className="h-6 w-6 transition-all duration-300 ease-in-out hover:text-mediumslateblue" />
    ),
  },
  {
    url: "https://www.linkedin.com/in/manojoffcialmj/",
    icon: (
      <LinkedinIcon className="h-6 w-6 transition-all duration-300 ease-in-out hover:text-mediumslateblue" />
    ),
  },
  {
    url: "https://github.com/bcapathshala",
    icon: (
      <GithubIcon className="h-6 w-6 transition-all duration-300 ease-in-out hover:text-mediumslateblue" />
    ),
  },
];

const Footer = () => {
  return (
    <>
      <hr />
      <div className="bg-gray-100 flex flex-col justify-center items-center p-4 gap-4">
        <div className="flex justify-center gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.url} target="_blank">
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-battleshipgray">
          &copy; {new Date().getFullYear()} Second Brain. All rights
          reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
