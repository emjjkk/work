import ServiceCard from "@/component/service";
import { LuArrowUpRight } from "react-icons/lu";

const services = [
  {
    id: "01",
    title: "Custom Website",
    description: "A fully functional, responsive, fast, and modern website tailored to your specific needs.",
  },
  {
    id: "02",
    title: "Personalized Stream Overlays",
    description: "Dynamic livestream overlays compatible with OBS Studio and Streamlabs.",
  },
  {
    id: "03",
    title: "Discord/Telegram Bots",
    description: "Custom bots for automation, moderation, and boosting engagement.",
  },
];

export default function Home() {
  return (
    <>
      <div className="px-4 sm:px-8 lg:px-32 py-8 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 border-b border-foreground/50">
        <span className="text-foreground/50 text-sm font-mono">work.emjjkk.tech</span>
        <nav className="flex items-center gap-4 sm:gap-6 text-foreground/50 text-sm font-mono">
          <a href="https://emjjkk.tech" target="__blank" className="hover:text-foreground flex items-center gap-1">
            main website <LuArrowUpRight className="text-xs" />
          </a>
          <a href="mailto:hi@emjjkk.tech" target="__blank" className="hover:text-foreground flex items-center gap-1">
            email me <LuArrowUpRight className="text-xs" />
          </a>
        </nav>
      </div>

      <div className="h-[40vh] md:h-[75vh] flex flex-col items-center justify-center border-b border-foreground/50 hero px-4">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl uppercase text-center">Dev Services</h1>
      </div>

      <div className="px-4 sm:px-8 lg:px-32 py-12 sm:py-16 lg:py-24 border-b border-foreground/50">
        <p className="text-base sm:text-lg/[1.8] mb-5">
          I'm Emmanuel Alabi, a software developer with three years in web development. I'm particularly proficient with Python and JavaScript. I host my other work and post about my other software dev endeavors over on my main site emjjkk.tech, and I can be reached anytime via Whatsapp or email.
        </p>
        <p className="text-base sm:text-lg/[1.8] mb-5">
          This website is where I showcase my services and make it easy for clients to hire me for custom projects. Whether you need a sleek website, a bot to automate your Discord or WhatsApp, or custom stream overlays, I handle it all from concept to deployment. I focus on creating solutions that are not just functional but also tailored to your needs. Every project I take on is crafted to be reliable, efficient, and designed to save you time while delivering real value.
        </p>
        <p className="text-base sm:text-lg/[1.8]">
          Let's work together to turn your digital vision into reality — fast, clean, and exactly the way you want it.
        </p>
      </div>

      <div className="px-4 sm:px-8 lg:px-32 py-12 sm:py-16 lg:py-20 border-b border-foreground/50">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl">Services</h2>
      </div>

      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}

      <div className="px-4 sm:px-8 lg:px-32 py-12 sm:py-16 lg:py-20 text-center border-foreground/50">
        <h2 className="text-base sm:text-lg">&copy; 2026 emjjkk.tech 🍜 All rights reserved.</h2>
      </div>
    </>
  );
}