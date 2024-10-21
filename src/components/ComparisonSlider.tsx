import React, { useState, useEffect, useRef, useCallback } from "react";
import { CancelIcon, CompareIcon } from "../assets/icons/icons";
import "../assets/styles/comparisonSlider.css";
import { Download } from "./Download";
import { useNavigate } from "react-router-dom";

interface props {
  topImage: { src: string; alt: string };
  bottomImage: { src: string; alt: string };
  onIsClicked?: (state: boolean) => void;
}
export const ComparisonSlider: React.FC<props> = ({
  topImage,
  bottomImage,
  onIsClicked,

}) => {
  const navigate = useNavigate();
  const [isResizing, setIsResizing] = useState(false);
  const topImageRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const setPositioning = useCallback((x: number) => {
    if (topImageRef.current && handleRef.current) {
      const { left, width } = topImageRef.current.getBoundingClientRect();
      const handleWidth = handleRef.current.offsetWidth;
      if (x >= left && x <= width + left - handleWidth) {
        handleRef.current.style.left = `${((x - left) / width) * 100}%`;
        topImageRef.current.style.clipPath = `inset(0 ${
          100 - ((x - left) / width) * 100
        }% 0 0)`;
      }
    }
  }, []);
  const handleCancelClick = () => {
    if(onIsClicked){
      onIsClicked(true)
    }else{
      navigate('/drag-and-drop')
    }
  }

  const handleResize = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.clientX) {
        setPositioning(e.clientX);
      } else if (
        e instanceof TouchEvent &&
        e.touches[0].clientX &&
        e.touches[0]
      ) {
        setPositioning(e.touches[0].clientX);
      }
    },
    [setPositioning]
  );

  // Set initial positioning on component mount
  useEffect(() => {
    if (topImageRef.current && handleRef.current) {
      const { left, width } = topImageRef!.current!.getBoundingClientRect();
      const handleWidth = handleRef.current!.offsetWidth;
      setPositioning(width / 2 + left - handleWidth / 2);
    }
  }, [setPositioning]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);

    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("touchmove", handleResize);
    window.removeEventListener("mouseup", handleResizeEnd);
    window.removeEventListener("touchend", handleResizeEnd);
  }, [handleResize]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (handleRef.current) {
        const { offsetLeft, offsetParent } = handleRef.current;

        if (e.code === "ArrowLeft") {
          setPositioning(
            offsetLeft + (offsetParent as HTMLElement).offsetLeft - 10
          );
        }

        if (e.code === "ArrowRight") {
          setPositioning(
            offsetLeft + (offsetParent as HTMLElement).offsetLeft + 10
          );
        }
      }
    },
    [setPositioning]
  );

  // Add keydown event on mount
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
      window.addEventListener("touchend", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
      window.removeEventListener("touchend", handleResizeEnd);
      window.removeEventListener("keyup", onKeyDown);
    };
  }, [isResizing, handleResize, handleResizeEnd, onKeyDown]);

  return (
    <>
      <div className="comparison-slider ">
        <div
          ref={handleRef}
          className="handle"
          onMouseDown={() => setIsResizing(true)}
          onTouchStart={() => setIsResizing(true)}
        >
          <CompareIcon />
        </div>
        <div ref={topImageRef} className="comparison-item top">
          <img draggable="false" src={topImage.src} alt={topImage.alt} />
        </div>
        <div className="comparison-item">
          <img draggable="false" src={bottomImage.src} alt={bottomImage.alt} />
        </div>
        <Download original={true} url={topImage.src} />
        <Download original={false} url={bottomImage.src} />
        <button type="button" className="absolute top-4 right-4 rounded-full bg-pink-500 p-2" onClick={()=>handleCancelClick()} title="back"><CancelIcon /></button>
      </div>

    </>
  );
};
