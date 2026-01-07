import { Phone } from "lucide-react";

interface SimplePhoneButtonProps {
  phoneNumber?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SimplePhoneButton = ({ 
  phoneNumber = "9725500435", 
  className = "",
  size = "md" 
}: SimplePhoneButtonProps) => {
  const handleCall = () => {
    // Direct tel: link - works on mobile devices
    window.location.href = `tel:${phoneNumber}`;
  };

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <button
      onClick={handleCall}
      className={`
        ${sizeClasses[size]}
        bg-green-500 hover:bg-green-600 
        text-white rounded-full 
        flex items-center justify-center 
        shadow-lg hover:shadow-xl 
        transition-all duration-200 
        active:scale-95
        ${className}
      `}
      title="Call us now"
      aria-label={`Call ${phoneNumber}`}
    >
      <Phone className={iconSizes[size]} />
    </button>
  );
};

export default SimplePhoneButton;