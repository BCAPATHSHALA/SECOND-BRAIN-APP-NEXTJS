import React, { ReactElement } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function BackgroundLinesDemo({
  title,
  description,
  primaryBTN,
  secondaryBTN,
}: {
  title: string;
  description?: string;
  primaryBTN?: ReactElement;
  secondaryBTN?: ReactElement;
}) {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl py-2 md:py-10 relative z-20 font-bold tracking-tight font-PaytoneOne">
        {title}
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        {description && description}
      </p>
      <div className="w-full flex justify-center items-center gap-4 mt-8 z-50">
        {primaryBTN && primaryBTN}
        {secondaryBTN && secondaryBTN}
      </div>
    </BackgroundLines>
  );
}
