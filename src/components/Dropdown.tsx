import React, { useState } from "react";

interface ComboBoxProps {
  label: string;
  options: string[];
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-2">
    <label className="text-gray-700 font-medium">{label}</label>
    <div className="relative">
      <select
        value={selectedOption || ""}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="bg-white border border-gray-300 rounded-[12px] w-full h-12 p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className="py-5 h-4">
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
};

export default ComboBox;
