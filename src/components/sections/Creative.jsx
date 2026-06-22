import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Creative() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.creative-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const creatives = [
    { emoji: "✍️", text: "Run Instagram pages for original poems, quotes, and reflections." },
    { emoji: "📊", text: "Create static posts that simplify Data Science and AI topics for beginners." },
    { emoji: "📸", text: "Join online photography and writing contests, playing with everyday moments and festival themes." },
    { emoji: "🎨", text: "Explore AI tools and ComfyUI for anime-style, chat-story visuals for future series." }
  ];

  return (
    <section id="creative" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black/20">
      <h2 className="text-4xl md:text-5xl font-bold mb-8"><span className="text-accent">#</span> Creative & Content Work</h2>
      
      <p className="text-xl text-textSecondary italic mb-12 max-w-2xl">
        "I don’t just code things; I also like telling stories around them."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creatives.map((item, idx) => (
          <div key={idx} className="creative-card flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-accent-secondary/50 transition-colors">
            <span className="text-3xl">{item.emoji}</span>
            <p className="text-textSecondary text-lg leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
