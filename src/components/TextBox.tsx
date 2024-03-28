import React from 'react';

interface TextBoxProps {
  campgroundName: string;
  phoneNumber: string;
}

const TextBox: React.FC<TextBoxProps> = ({ campgroundName, phoneNumber }) => {
  return (
    <div className="bg-green-200 p-4 rounded-md mb-4 flex items-center">
      <img src="/img/cover.jpg" alt={campgroundName} className="w-64 h-64 rounded-md mr-4" />
      <div>
        <div className="text-black">{campgroundName}</div>
        <div className="ml-2 text-black">{phoneNumber}</div>
      </div>
      <div className="ml-auto">
        <button className="text-white bg-green-500 px-2 py-1 rounded-md mr-2 hover:bg-green-600">Edit</button>
        <button className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TextBox;
