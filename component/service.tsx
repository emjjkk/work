"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function ServiceCard({ id, title, description }: any) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    return (
        <div
            className="group border-foreground/50 cursor-pointer transition-colors "
            onClick={() => setOpen(!open)}
        >
            <div className="border-b border-foreground/50 flex flex-col sm:flex-row relative z-10 hover:bg-white/5 transition-colors">
                <div className="py-6 sm:py-10 sm:w-[200px] flex items-center justify-center border-foreground/50 sm:border-r border-b sm:border-b-0">
                    <p className="text-xl sm:text-2xl font-mono">{id}</p>
                </div>

                <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center border-foreground/50 sm:border-r border-b sm:border-b-0">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-2">{title}</h3>
                    <p className="text-base sm:text-lg text-foreground/70">
                        {description}
                    </p>
                </div>

                <div className="py-6 sm:py-10 sm:w-[200px] flex items-center justify-center">
                    <LuChevronDown
                        className={`text-xl transition-transform duration-200 ${open ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </div>

            {/* EXPANDABLE DETAIL SECTION */}
            <div
                className={`transition-all duration-300 ease-out overflow-hidden ${open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="py-8 sm:py-10 px-4 sm:px-8 lg:px-32 text-sm text-foreground border-foreground/50 bg-foreground/2 border-b">
                    {title === "Custom Website" && (
                        <>
                            <p className="text-base sm:text-lg/[1.8] mb-3">
                                Get fully custom website tailored to your brand, your goals, and your audience. Whether you're a startup, creator, business, or personal brand, I focus on building sites that load fast, look sharp, and are easy to maintain long-term. You get a site that feels premium and works exactly how you need it to.
                            </p>
                            <p className="text-base sm:text-lg/[1.8] mb-3">
                                Every build can include smart SEO foundations to help your site get discovered on Google, clean technical structure for better rankings, and performance optimizations so your pages stay fast on all devices. If you're selling online, I can integrate secure e-commerce with product management, payments, and order handling built to scale with your business.
                            </p>
                            <p className="text-base sm:text-lg/[1.8]">
                                You can also get a flexible content management system, so you can easily update text, images, blog posts, or products without touching code. For clients who want a hands-off experience, I offer optional ongoing maintenance, updates, security monitoring, and hosting setup to keep everything running smoothly. That means fewer headaches, better uptime, and a site that continues to perform as your business grows.
                            </p>
                        </>
                    )}

                    {title === "Personalized Stream Overlays" && (
                        <>
                            <p className="text-base sm:text-lg/[1.8]">
                                If you're a content creator who goes live, you can get custom stream overlays that are fully compatible with OBS Studio and Streamlabs. Each overlay is designed to enhance your stream visually while keeping your brand front and center, giving viewers a polished, professional experience that makes your content stand out. This includes dynamically triggered overlays (like the ones that pop up when you get a new follower, subscriber, or donation), as well as static ones.
                            </p>
                        </>
                    )}

                    {title === "Discord/Telegram Bots" && (
                        <p className="text-base sm:text-lg/[1.8]">
                            I build custom bots for Discord and Telegram that automate tasks, moderate communities, and drive engagement. Each bot is designed with scalability in mind, so it grows with your server or channel while keeping your workflow simple and efficient. Where possible, I can develop them lightweight and serverless, so you don't have to worry about hosting or maintenance. Whether you need a bot to welcome new members, manage roles, post updates, or integrate with other services, I can create a solution that fits your needs and keeps your community thriving.
                        </p>
                    )}

                    <p className="font-mono text-sm text-foreground/70 w-fit mt-8 sm:mt-10 mb-3">
                        Get more info about this service
                    </p>

                    {/* FORM */}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true);

                            const formData = new FormData();
                            formData.append("name", name);
                            formData.append("email", email);
                            formData.append("service", title);
                            formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");
                            formData.append("subject", `New Service Inquiry: ${title}`);
                            formData.append("redirect", ""); // optional, leave blank to stay on page

                            try {
                                const res = await fetch("https://api.web3forms.com/submit", {
                                    method: "POST",
                                    body: formData,
                                });

                                const json = await res.json();
                                if (json.success) {
                                    setSent(true);
                                    setName("");
                                    setEmail("");
                                } else {
                                    alert("Something went wrong, try again.");
                                }
                            } catch (err) {
                                console.error(err);
                                alert("Something went wrong, try again.");
                            } finally {
                                setLoading(false);
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="border-foreground/20 flex flex-col sm:flex-row gap-2"
                    >

                        <input
                            required
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent border border-foreground/40 px-4 py-3 text-sm outline-none focus:border-foreground w-full sm:w-auto"
                        />

                        <input
                            required
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border border-foreground/40 px-4 py-3 text-sm outline-none focus:border-foreground w-full sm:w-auto"
                        />

                        <button
                            type="submit"
                            disabled={loading || sent}
                            className="border border-foreground px-6 py-3 text-sm font-mono hover:bg-foreground hover:text-background transition-colors w-full sm:w-fit"
                        >
                            {sent ? "Sent ✓" : loading ? "Sending..." : "Email Me"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}