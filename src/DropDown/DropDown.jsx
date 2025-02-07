import React from "react";

const DropDown = ({ title, options ,handleDropdown}) => {
    
  return (
    <div className="relative inline-block w-80 pt-">
      <select
        onChange={ handleDropdown}
        defaultValue="0"
        name="format"
        id="format"
        className="
          appearance-none
          outline-none
          shadow-none
          border-none
          bg-gray-800
          bg-none
          flex-1
          
          px-3
          text-white
          cursor-pointer
          text-base
          font-sans
          rounded
          w-full
          
          leading-12
          overflow-hidden
          pr-10
        "
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option.toUpperCase()}</option>
        ))}
      </select>
      <div
        className="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          px-2
          pointer-events-none
          bg-gray-800
          transition-colors
          duration-200
        "
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropDown;
