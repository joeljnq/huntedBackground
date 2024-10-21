import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { BoxDragAndDrop } from './BoxDragAndDrop';
import { ImageSelected } from './ImageSelected';
import { fileUpload } from '../utils/fileUpload';

interface props{
    images: ImageListType;
    onChangePublicID: (id:string)=>void;
    onChangeImages: (images: ImageListType) => void;
    urlImage: string;
    onChangeUrlImage: (urlImage: string) => void;
    cloudName: string;
    preset: string;
    prompt: string;
    filter: string;

}
interface upload {
    secure_url: string;
    public_id: string;
}




export const DragAndDrop: React.FC<props> = ({images,onChangePublicID, onChangeImages,  onChangeUrlImage, cloudName, preset, filter, prompt}) =>  {
    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (imageList: ImageListType) => onChangeImages(imageList);
    const onUpload = async () => {
        setLoading(true);
        
        const url : upload | null = await fileUpload(images[0].file!, cloudName, preset);
        setLoading(false);
        
        onChangeUrlImage(url!.secure_url);
        onChangePublicID(url!.public_id);
        onChangeImages([]);
      }

      
    return (
        <>
        <ImageUploading  multiple={false} maxNumber={1} value={images} onChange={handleChange}>
            {({
                 imageList,
                 onImageUpload,
                 dragProps,
                 isDragging,
                 onImageRemove,
                 onImageUpdate,
            })=>(
            <>
            {
                imageList[0]
                ? <ImageSelected img={imageList[0].dataURL!} {...{onImageRemove,  onUpload, onImageUpdate, loading,filter,prompt}}   />
                : <BoxDragAndDrop {...{ onImageUpload, dragProps, isDragging}} />
                    
            }
            </>
            )}
        </ImageUploading>
        </>
    )
}