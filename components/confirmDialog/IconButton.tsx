import React from "react";

interface IIconButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
export default function IconButton(props: IIconButtonProps) {
  const {
    children,
    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {},
    className = "",
  } = props;
  return (
    <button
      onClick={onClick}
      className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-1 m-2 rounded inline-flex items-center ${className}`}>
      {children}
    </button>
  );
}
