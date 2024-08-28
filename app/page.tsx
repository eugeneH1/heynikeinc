'use client'
import Image from "next/image";
import Blog2 from "./components/Blog";
import { Separator } from "@/components/ui/separator";
import BlogPage from "./components/Blog";
import { TabsSection } from "@/components/TabsSection";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
    <main id='home'className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Separator /> */}
      <Hero />

      <Separator />
      <div id="departments">
        <TabsSection />
      </div>

      <Separator />
       
    </main>
    <div id="blog">    
      <BlogPage />
    </div> 
      </>
    );
}
