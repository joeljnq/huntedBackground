import React from 'react';

interface Props{
  onImageUpload: () => void;
  dragProps: object;
  isDragging: boolean
}

export const BoxDragAndDrop:React.FC<Props> = ({ isDragging, onImageUpload, dragProps }) => {
    return (
      <div
        onClick={onImageUpload}
        {...dragProps}
        className={`container mx-auto max-w-sm border-2 h-32 border-dashed border-white lg:max-w-3xl lg:h-72 bg-opacity-85 flex justify-center items-center ${isDragging ? 'bg-red' : ' bg-black '}`}
      >
        <span>Chosee an Image or Drag and Drop an Image 📤</span>
      </div>
    )
  }