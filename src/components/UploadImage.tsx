import { useEffect, useState } from "react";

import { DragAndDrop } from "./DragAndDrop";
import { Comparator } from "./Comparator";
import { ImageListType } from "react-images-uploading";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { faces } from "@cloudinary/url-gen/qualifiers/focusOn";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { Transformation } from "@cloudinary/url-gen";
import { GenerativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect/GenerativeBackgroundReplace";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Loading } from "./Loading";
import { Filter } from "./Filter";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const preset = import.meta.env.VITE_PRESET;

const cld = new Cloudinary({
  cloud: {
    cloudName: cloud_name,
  },
});

const BACKGROUND = [
  "dark zombie apocalypse background with fog",
  "dark halloween pumpkin background and some bat that is flying",
  "dark cementery background with zombies that are coming out of their grave",
  "dark enchant forest background with a lot of fog and twisted trees ",
];
export default function UploadImage() {
  const [images, setImages] = useState<ImageListType>([]);
  const [urlImage, setUrlImage] = useState<string>("");
  const [publicId, setPublicId] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const cancelCLick = () => {
    setImages([]);
    setUrlImage("");
    setPublicId("");
    setTransformedImageUrl(null);
    setOriginalImageUrl(null);
  };
  useEffect(() => {
    const handleImageUpload = async () => {
      try {
        setLoading(true);
        const transformedImage = cld.image(publicId);
        transformedImage.addTransformation(
          new Transformation()
            .effect(
              new GenerativeBackgroundReplace().prompt(
                selectedFilter ? selectedFilter  : prompt
              )
            )
            .delivery(quality("auto:best"))
            .overlay(
              source(
                image("terror/images/dlqfczq5a24tnfh4bvsr").transformation(
                  new Transformation().resize(
                    scale().width("1.2").regionRelative()
                  )
                )
              ).position(new Position().gravity(focusOn(faces())))
            )
        );
        const urlTRansformed = transformedImage.toURL();
        const response = await fetch(urlTRansformed);
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        setTransformedImageUrl(downloadUrl);
        setLoading(false);
      } catch (e) {
        console.error("error uploading image:", e);
      }
    };
    const getImageUrl = async () => {
      try {
        const response = await fetch(urlImage);
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        setOriginalImageUrl(downloadUrl);
      } catch (e) {
        console.error("error getting image url", e);
      }
    };

    if (urlImage) {
      handleImageUpload();
      getImageUrl();
    }
  }, [urlImage, publicId, cld]);

  return (
    <div className="container bg-gradient-to-b max-w-full from-black to-gray-900/90 min-h-screen ">
    <header className="max-w-full">
      <h1 className="lg:text-3xl text-xl  text-center font-bold p-4 font-sixtyfour">HauntedBackground</h1>
    </header>
      <main className="font-roboto">
        <Filter
          onChangeSelected={setSelectedFilter}
          backgroundOptions={BACKGROUND}
          onChangePrompt={setPrompt}
        />
        {!urlImage && (
          <DragAndDrop
            images={images}
            onChangePublicID={setPublicId}
            onChangeImages={setImages}
            urlImage={urlImage}
            onChangeUrlImage={setUrlImage}
            cloudName={cloud_name}
            preset={preset}
            filter={selectedFilter ? selectedFilter : ''}
            prompt={prompt}
          />
        )}
        {originalImageUrl && transformedImageUrl && !loading && (
          <Comparator
            originalImageUrl={originalImageUrl!}
            transformedImageUrl={transformedImageUrl!}
            onCancelClick={cancelCLick}
          />
        )}

        {loading && <Loading />}
      </main>
    </div>
  );
}
