import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import About from "@/components/public/About";
import Feature from "@/components/public/Feature";
import Hero from "@/components/public/Hero";
import Task from "@/components/public/Task";


export default function Home() {
  return (
    <>
      <Hero />
      <Task />
      <Feature />
      <About />
    </>
  );
}
