import React from "react";

interface DropdownSelectProps {
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
