export const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col h-full w-full items-center justify-center"
    >
      <h1 className="text-6xl font-semibold">Hero</h1>
    </div>
  );
};
