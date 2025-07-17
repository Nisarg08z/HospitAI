import React, { useEffect, useState } from "react";
import useVoiceAgent from "../../hooks/useVoiceAgent";

const VoiceAgent = () => {
  const { handleUserResponse } = useVoiceAgent();
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleUserResponse(text);
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    if (listening) recognition.start();

    return () => recognition.stop();
  }, [listening]);

  useEffect(() => {
    setListening(true); 
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">AI Voice Agent</h2>
      <p className="text-gray-600">Listening for your response...</p>
    </div>
  );
};

export default VoiceAgent;
