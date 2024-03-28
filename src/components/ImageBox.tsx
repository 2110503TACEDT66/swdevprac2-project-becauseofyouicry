import React from 'react';

interface ImageBoxProps {
  imgSrc: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ imgSrc }) => {
  return (
    <div className="flex items-center justify-center">
      <img src={imgSrc} alt="Campground Image" className="w-full h-auto rounded-md" />
    </div>
  );
};

export default ImageBox;
