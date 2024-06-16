"use client";

import React, { useEffect } from "react";

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voiceURI = "Microsoft Sabina Desktop - Spanish (Spain)";
    utterance.lang = "es-ES";
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (text !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voiceURI = "Microsoft Sabina Desktop - Spanish (Spain)";
      utterance.lang = "es-ES";
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <button onClick={speak}>Hablar</button>
    </div>
  );
};

export default TextToSpeech;
