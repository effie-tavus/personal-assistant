import { memo } from "react";
import { Button } from "./ui/button";
import { Settings, Check, LogOut } from "lucide-react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import { settingsSavedAtom } from "@/store/settings";
import { clearApiTokenAtom } from "@/store/tokens";

export const Header = memo(() => {
  const [, setScreenState] = useAtom(screenAtom);
  const [conversation] = useAtom(conversationAtom);
  const [settingsSaved] = useAtom(settingsSavedAtom);
  const [, clearToken] = useAtom(clearApiTokenAtom);

  const handleSettings = () => {
    if (!conversation) {
      setScreenState({ currentScreen: "settings" });
    }
  };

  const handleLogout = () => {
    clearToken();
    setScreenState({ currentScreen: "intro" });
  };

  return (
    <header className="flex w-full items-start justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
      <img
        src="/images/logo.svg"
        alt="Tavus"
        className="relative h-6 sm:h-10"
      />
      <div className="relative flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          className="relative size-10 sm:size-14 border-0 bg-transparent hover:bg-zinc-800"
          title="Logout"
        >
          <LogOut className="size-4 sm:size-6" />
        </Button>
        {settingsSaved && (
          <div className="absolute -top-2 -right-2 z-20 rounded-full bg-green-500 p-1 animate-fade-in">
            <Check className="size-3" />
          </div>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={handleSettings}
          className="relative size-10 sm:size-14 border-0 bg-transparent hover:bg-zinc-800"
        >
          <Settings className="size-4 sm:size-6" />
        </Button>
      </div>
    </header>
  );
});
