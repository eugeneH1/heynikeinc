'use client'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import BlogPage from "./components/Blog";
import { TabsSection } from "@/components/TabsSection";
import { Hero } from "@/components/Hero";
import Team from "./components/Team";
import ServicesComponent from "./components/Services";

export default function Home() {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Separator /> */}
      <div id="home">
        <Hero />
      </div>

      <Separator />
      <div id="departments">
        <TabsSection />
      </div>

      <Separator />
      <div id="services" className="my-20">
        <ServicesComponent />
      </div>

      <Separator />
      <div id="team">
        <Team />
      </div>

    <Separator />   
    </main>
    <div id="blog">    
      <BlogPage />
    </div> 
      </>
    );
}
