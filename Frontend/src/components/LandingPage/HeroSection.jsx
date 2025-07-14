import React, {useContext} from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/HeroSectionAnimation.json";
import FadeInOnScroll from "../layout/FadeInOnScroll";
import "../../styles/hero.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const HeroSection = () => {

   const { isLogedin } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <FadeInOnScroll>
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-16 min-h-10">
        {/* Left: Animation */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="w-96 h-96 rounded-full overflow-hidden">
            <Lottie animationData={animationData} loop />
          </div>
        </div>

        {/* Right: Text */}
        <div className="flex flex-col items-center text-center md:w-1/2 gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text gradient-text leading-snug">
            Talk. Heal. Automate.
          </h2>
          <p className="text-gray-600 fade-in text-lg px-4 md:px-0">
            Welcome to <span className="font-semibold text-orange-500">HospitAI</span> — an AI-powered hospital system that lets patients book appointments using voice. Say your symptoms. Get treated. No forms, no hassle.
          </p>
          <button
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md mt-2 px-6 py-2 rounded-full"
            onClick={() => isLogedin ? navigate("/patient") : navigate("/login")}
          >
            🎤 Start Voice Booking
          </button>
        </div>
      </section>
    </FadeInOnScroll>
  );
};

export default HeroSection;
