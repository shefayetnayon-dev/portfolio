import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import PortfolioSection from './components/PortfolioSection';
import Pricing from "./components/Pricing";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import Testimonials from "./components/Testimonials";


export default function Home() {
  return (
    <div>
      <main>
        <Hero/>
        <About/>
        <Services/>
        <PortfolioSection/>
        <Pricing/>
        {/* Testimonials */}
        <Testimonials/>
        {/* blog */}
        <BlogSection/>
        {/* contact form */}
        <ContactForm/>
      </main>
    </div>
  );
}
