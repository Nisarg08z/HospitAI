import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

   const { isLogedin } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white text-black border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center gap-10">
        {/* Tagline / Branding */}
        <h2 className="text-4xl font-bold text-orange-500 text-center">
          Simplifying Healthcare with AI-Powered Patient Onboarding
        </h2>

        {/* CTA Button */}
        <button
          className="rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md px-8 py-3 text-lg"
          onClick={() => isLogedin ? navigate("/patient") : navigate("/login")}
        >
          Start Voice-Based Appointment
        </button>

        {/* Divider */}
        <hr className="w-full border-t border-gray-300 mt-10" />

        {/* Bottom section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="font-semibold">HospitAI</span>. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="px-5 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md"
          >
            ⬆ Go to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
