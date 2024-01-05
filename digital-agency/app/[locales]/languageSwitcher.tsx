"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

const LanguageSwitcher = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: "en",
    label: "English",
  });
  const router = useRouter();
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "de", label: "German" },
    { value: "cs", label: "Czech" },
    { value: "fr", label: "French" },
  ];

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    router.push(`/${selectedOption.value}`);
  };

  return (
    <Select
      className="bg-gray-900 border-none"
      options={languageOptions}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
    />
  );
};

export default LanguageSwitcher;
