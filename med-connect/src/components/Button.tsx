"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg hover:scale-105",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    danger:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-105",
    success:
      "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:scale-105",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      {...props}
    >
      {children}
    </button>
  );
}
