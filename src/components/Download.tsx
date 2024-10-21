import React from "react";
import { DownloadIcon } from "../assets/icons/icons";

interface props {
  original: boolean;
  url: string;
}
export const Download:React.FC<props> = ({ original, url }) => {
  return (
    <a
      download={original ? "original" : "customizeImg"}
      title="Download"
      href={url}
      className={`p-3 ${original ? 'bg-black': 'bg-blue-600'}  z-50 rounded-full absolute bottom-5 ${
        original ? "left-5" : "right-5"}`}>
      <DownloadIcon />
    </a>
  );
};
