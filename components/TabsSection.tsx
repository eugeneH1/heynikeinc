"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";

export function TabsSection() {
  const tabs = [
    {
      title: "Commercial & Business Department",
      value: "commercial-business",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#002f6c] to-[#008080]">
          <p>Commercial & Business Department</p>
            <BusinessContent />
        </div>
      ),
    },
    {
      title: "Conveyancing Department",
      value: "conveyancing",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#008080] to-[#98ff98]">
          <p>Conveyancing Department</p>
            <ConveyancingContent />
        </div>
      ),
    },
    {
      title: "Attorney Agents",
      value: "attorney-agents",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#98ff98] to-[#fffacd]">
          <p>Attorney Agents</p>
            <AttorneyContent />
        </div>
      ),
    },
    {
      title: "Collections Department",
      value: "collections",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#fffacd] to-[#ff7f50]">
          <p>Collections Department</p>
            <CollectionsContent />
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

const AttorneyContent = () => {
  return (
    <div className="w-full h-full  text-xl">
        <br/>
        <p>And of course, the team of Property Consultants managing the sales for the firm.</p>
    </div>
  );
};

const BusinessContent = () => {
    return (
      <div className="w-full h-full  text-xl">
          <br/>
          <p>Firstly there is the litigation department consisting of Maartens Heynike a senior attorney with nearly 40 years of experience , 
            and his son and candidate attorney Daniel Heynike, who assists him in both law and business. 
            Also aided by Merle Capotis a highly competent PA.</p>
      </div>
    );
  };
  
  const ConveyancingContent = () => {
    return (
      <div className="w-full h-full  text-xl">
          <br/>
          <p>Secondly the conveyancing team, comprised of Bronwen Gordon and her conveyancing secretary Pauline.</p>
      </div>
    );
  }

  const CollectionsContent = () => {
    return (
      <div className="w-full h-full  text-xl">
        <br/>
          <p>Finally, Heynike Inc also has a small debt collections department, Mary and Sandra have been working for Heynike Inc 
            and running this department for over 20 years, with immense experience their success trumps firms with double the staff.</p>
      </div>
    );
  }