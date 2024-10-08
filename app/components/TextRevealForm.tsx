"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <TextRevealCard
        text="You know your business"
        revealText="We know the law "
      >
        <TextRevealCardTitle>
          Sometimes, you just need to call.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
         But if you don&apos;t want to, fill out the form below.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
