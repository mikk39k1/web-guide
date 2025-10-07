import { Hero } from "@/components/landing-components/Hero";

export default async function Home() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Hero />
    </div>
  );
}
