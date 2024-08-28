"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";

export function TabsSection() {
  const tabs = [
    {
      title: "Attorney Agents",
      value: "attorney-agents",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Attorney Agents</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Conveyancing Department",
      value: "conveyancing",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Conveyancing Department</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Commercial & Business",
      value: "commercial-business",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Commercial & Business</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Collections Department",
      value: "collections",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Collections Department</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="w-full h-full  text-xl">
        <p>Dummy Content</p>
    </div>
  );
};
