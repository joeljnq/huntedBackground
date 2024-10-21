import React, { useEffect, useState } from "react";
import { ComparisonSlider } from "./ComparisonSlider";


interface props {
 originalImageUrl: string;
  transformedImageUrl: string;
  onCancelClick: () => void;
}


export const Comparator: React.FC<props> = ({ originalImageUrl, transformedImageUrl, onCancelClick }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  useEffect(()=>{
    if(isClicked){
      onCancelClick()
    }

  },[isClicked, onCancelClick])

  return (
    <div className="w-full flex flex-col items-center">
      {transformedImageUrl && originalImageUrl && (
        <ComparisonSlider
          topImage={{ src: originalImageUrl, alt: "Original" }}
          bottomImage={{ src: transformedImageUrl!, alt: "Transformada" }}
          onIsClicked={setIsClicked}
        />
      )}
    
    </div>
  );
};
