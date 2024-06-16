import { Promobanner, Navbar, GlobalChatBot } from "./components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Promobanner />
      <GlobalChatBot width="size-12" />
    </div>
  );
}
