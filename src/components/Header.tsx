import { memo } from "react";

export const Header = memo(() => {
  return (
    <header className="flex w-full flex-col items-center justify-start gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
      <img
        src="/images/logo.svg"
        alt="Tavus"
        className="relative h-6 sm:h-10 mb-2"
      />
      <div className="w-full max-w-2xl text-center text-white text-2xl font-bold mb-1" style={{ fontFamily: 'Source Code Pro, monospace' }}>
        Hey I'm Hudson, your AI friend.
      </div>
      <div className="w-full max-w-2xl text-center text-white text-base font-normal opacity-90 px-2">
        I keep track of our conversations and what matters to you.
      </div>
    </header>
  );
});
