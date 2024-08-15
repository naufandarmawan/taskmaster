import React from "react";

const Input = ({label, value, onChange, placeholder, required, type = "text"}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="font-normal text-base text-[#000000]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-3 rounded-lg font-normal text-sm text-[#000000] placeholder:text-[#858D96] outline-none border border-[#000000]"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
