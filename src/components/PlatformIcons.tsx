// components/PlatformIcons.tsx
import React from "react";
import { Game } from "../types";
import pc from "../assets/icons/platforms/pc.svg";
import android from "../assets/icons/platforms/android.svg";
import playstation from "../assets/icons/platforms/playstation.svg";
import ios from "../assets/icons/platforms/ios.svg";
import xbox from "../assets/icons/platforms/xbox.svg";

export const PlatformIcons: React.FC<{ platforms: Game["platforms"] }> = ({
  platforms,
}) => {
  const icons = ["pc", "android", "playstation", "ios", "xbox"] as const;
  const platformIcons: Record<(typeof icons)[number], string> = {
    pc,
    android,
    playstation,
    ios,
    xbox,
  };

  const names = (platforms ?? [])
    .map((p) => icons.find((i) => p.platform.slug.toLowerCase().includes(i)))
    .filter((p): p is keyof typeof platformIcons => !!p);

  return (
    <div className="platforms flex gap-2">
      {names.map((platform, index) => (
        <img
          key={index}
          src={platformIcons[platform]}
          alt={platform}
          className="w-4"
        />
      ))}
    </div>
  );
};
