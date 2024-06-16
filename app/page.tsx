import Image from "next/image";
import { Promobanner, CreateProducto, TextToSpeech } from "./components";

export default function Home() {
  const textToSpeak = "¡Hola! Soy Mónica, la voz de esta aplicación.";
  return (
    <div>
      <h1>Entiendes?</h1>
      <TextToSpeech text={textToSpeak} />
    </div>
  );
}
