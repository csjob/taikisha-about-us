import Scene1_Founder from "@/components/Scene1_Founder";
import Scene2_Timeline from "@/components/Scene2_Timeline";
import Scene3_Map from "@/components/Scene3_Map";
import Scene4_ParallaxText from "@/components/Scene4_ParallaxText";
import Scene5_Directory from "@/components/Scene5_Directory";
import FloatingClouds from "@/components/FloatingClouds";
import Footer from "@/components/Footer";
import Scene3_Map_Sequence from "@/components/Scene3_Map_Sequence";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-neutral-50 relative">
      <FloatingClouds />
      <div className="relative z-10">
        <Scene1_Founder />
        <Scene2_Timeline />
        {/* <Scene3_Map /> */}
        <Scene3_Map_Sequence />
        <Scene4_ParallaxText />
        <Scene5_Directory />
        <Footer />
      </div>
    </main>
  );
}
