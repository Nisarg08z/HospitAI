import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import QuestionsAnimation from "../Animation/QuestionsAnimation"; // ← import animation

const faqs = [
  {
    question: "What is HospitAI?",
    answer:
      "HospitAI is an AI-powered hospital system that allows patients to fill forms and book doctor appointments using a voice agent without manual input.",
  },
  {
    question: "How does the voice agent work?",
    answer:
      "The system uses speech recognition and GenAI (OpenAI) to understand patient details like name, age, and symptoms, and automatically fills the form and books an appointment.",
  },
  {
    question: "Do doctors have a separate dashboard?",
    answer:
      "Yes, doctors can log in to view upcoming appointments, update timings, and manage patient details via their own interface.",
  },
  {
    question: "What happens if a doctor reschedules an appointment?",
    answer:
      "If a doctor changes the appointment time, the patient receives an automatic email notification with the updated timing.",
  },
  {
    question: "Do I need to install anything to use it?",
    answer:
      "No, HospitAI runs entirely in the browser. All you need is a mic-enabled device and internet connection.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, all patient and appointment data is securely stored in a MongoDB database and only accessible to authorized users.",
  },
];


const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative flex flex-col items-center gap-10 py-20 px-4 bg-white text-black overflow-hidden w-full">

      <QuestionsAnimation
  className="absolute top-0 left-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 animate-fade-in-slow"
/>


      <h2 className="text-4xl font-bold text-orange-500 z-10">Questions</h2>

      <div className="w-full max-w-6xl space-y-4 z-10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={clsx(
                "transition-all duration-300 ease-in-out border border-gray-200 rounded-xl overflow-hidden shadow-md",
                {
                  "bg-orange-50 border-orange-300 scale-[1.01]": isOpen,
                  "bg-white": !isOpen,
                }
              )}
            >
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full p-5 text-left"
              >
                <span className="font-semibold text-lg text-black">{faq.question}</span>
                <ChevronDown
                  className={clsx(
                    "w-5 h-5 text-orange-600 transform transition-transform duration-300",
                    {
                      "rotate-180": isOpen,
                    }
                  )}
                />
              </button>
              <div
                className={clsx(
                  "px-5 overflow-hidden transition-all duration-300 text-gray-700",
                  {
                    "max-h-[500px] pb-4": isOpen,
                    "max-h-0": !isOpen,
                  }
                )}
              >
                <p className="text-base">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>

  );
};

export default Questions;
