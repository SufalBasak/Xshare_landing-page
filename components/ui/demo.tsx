"use client";

import { WorksWheel, type WorksWheelItem } from "./works-wheel";

// Learning & Arcade Game Items tailored for XShare Platform
const WORKS: WorksWheelItem[] = [
  {
    title: "Flappy Bug",
    image: "/assets/games/flappy-bug.png",
    href: "https://play.google.com/store/apps/details?id=com.xshare.learnshare",
  },
  {
    title: "Brain Blitz",
    image: "/assets/games/brain-blitz.png",
    href: "https://play.google.com/store/apps/details?id=com.xshare.learnshare",
  },
  {
    title: "Deploy Dash",
    image: "/assets/games/deploy-dash.png",
    href: "https://play.google.com/store/apps/details?id=com.xshare.learnshare",
  },
  {
    title: "Code Racer",
    image: "/assets/games/code-racer.png",
    href: "https://play.google.com/store/apps/details?id=com.xshare.learnshare",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Arcade Arena '26" action="Play Quest" />
    </div>
  );
}
