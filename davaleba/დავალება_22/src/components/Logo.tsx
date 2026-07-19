import logo from "../assets/Logo.svg";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logo} alt="Logo" className="h-8 w-8" />

    </div>
  );
}