import type React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({
  text,
  variant = "primary",
  ...props
}) => (
  <button
    className={`w-full ${
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-700"
        : "bg-zinc-800 hover:bg-zinc-950"
    } text-white font-bold py-2 px-4 rounded`}
    {...props}
  >
    {text}
  </button>
);
