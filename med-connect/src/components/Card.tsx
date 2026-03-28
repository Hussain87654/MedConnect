"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  style,
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${
        paddingStyles[padding]
      } ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
