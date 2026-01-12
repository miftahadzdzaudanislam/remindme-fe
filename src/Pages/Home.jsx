import About from "../components/public/About";
import Feature from "../components/public/Feature";
import MainHero from "../components/public/Hero";
import Task from "../components/public/Task";

export default function Home() {
  return (
    <>
      <MainHero />
      <Task />
      <Feature />
      <About />
    </>
  );
}
