import React, { useState } from 'react';

interface NumberedReferenceProps {
  number: number;
  content: string;
}

const NumberedReference: React.FC<NumberedReferenceProps> = ({ number, content }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <span className="relative">
      <sup
        className="cursor-pointer text-blue-500 hover:text-blue-700"
        onMouseEnter={() => setIsPopupVisible(true)}
        onMouseLeave={() => setIsPopupVisible(false)}
      >
        [{number}]
      </sup>
      {isPopupVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-2 rounded shadow-lg text-sm w-64 z-50">
          {content}
        </div>
      )}
    </span>
  );
};

export default NumberedReference;