import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowDown, ChevronUp, ChevronDown, Play, Clock, MapPin, Phone } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const floatingAnimation: any = {
  y: [0, -10, 0],
  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
};

const Navbar = () => (
  <motion.nav 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex items-center justify-between py-6 px-6 lg:px-24 w-full absolute top-0 z-50"
  >
    <div className="font-ultra text-3xl tracking-wider text-brand-light relative z-10">BKR</div>
    <div className="hidden md:flex gap-12 text-xs font-medium text-brand-light/90 ml-12 relative z-10">
      <a href="#" className="hover:text-brand-orange transition-colors">About</a>
      <a href="#" className="hover:text-brand-orange transition-colors">Products</a>
      <a href="#" className="hover:text-brand-orange transition-colors">Recipes</a>
    </div>
    
    <div className="flex-1 flex justify-center absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none">
      <svg className="w-64 h-16 stroke-brand-olive opacity-80" fill="none" strokeWidth="2">
        <path d="M0,0 Q40,30 80,0 T160,0 T240,0" />
      </svg>
    </div>
    
    <button className="border border-brand-light/20 px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-brand-light hover:text-brand-dark transition-all rounded-sm z-10">
      Contact
    </button>
  </motion.nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-24 px-6 lg:px-24 min-h-screen flex flex-col justify-center overflow-hidden bg-brand-dark text-brand-light">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute top-0 right-0 w-[55%] h-full -z-10 pointer-events-none flex items-center justify-center"
    >
       <motion.div animate={floatingAnimation} className="absolute w-full h-full">
         <svg viewBox="0 0 200 200" className="absolute w-[110%] h-[110%] top-0 right-[-10%] opacity-90 text-brand-olive z-0">
            <path fill="currentColor" d="M45.7,-76.4C58.9,-70.8,68.9,-56.3,77.5,-41.7C86.1,-27.1,93.3,-12.3,91.8,1.9C90.3,16,80.1,29.5,70.5,41.9C60.9,54.3,51.8,65.6,39.8,71.2C27.8,76.8,12.9,76.6,0.2,76.3C-12.6,75.9,-25.1,75.3,-38.3,71C-51.5,66.8,-65.4,58.8,-73.2,46.9C-81.1,35,-82.8,19.1,-82.3,4.1C-81.8,-10.9,-79,-25,-71.4,-36.5C-63.7,-48,-51.2,-56.9,-38.3,-62.7C-25.3,-68.5,-11.8,-71.2,2.4,-75.4C16.6,-79.6,32.5,-82,45.7,-76.4Z" transform="translate(100 100) rotate(15) scale(1.1)" />
         </svg>
         
         <div className="absolute top-[30%] left-[5%] flex gap-2 rotate-12 z-0">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-beige"></div>
            <div className="w-2 h-2 rounded-full bg-brand-light"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
         </div>
         <div className="absolute top-[35%] left-[2%] flex gap-2 -rotate-12 z-0">
            <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-beige"></div>
         </div>
         <div className="absolute top-[40%] left-[8%] flex gap-2 rotate-45 z-0">
            <div className="w-1 h-1 rounded-full bg-brand-light"></div>
            <div className="w-2 h-2 rounded-full bg-brand-beige"></div>
         </div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-orange rounded-full z-10 ml-8 mt-8"></div>
         
         <div className="absolute top-[12%] left-[10%] w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-brand-dark z-20 shadow-2xl drop-shadow-2xl bg-brand-dark flex items-center justify-center">
           <img
             src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
             alt="Fresh bread"
             className="w-full h-full object-cover"
           />
         </div>
         
         <svg className="absolute top-[15%] right-[5%] w-64 h-32 stroke-brand-beige opacity-80 z-20" fill="none" strokeWidth="2">
            <path d="M0,50 Q40,10 80,50 T160,50 T240,50" />
         </svg>

         <div className="absolute bottom-[5%] right-[20%] w-[380px] h-[480px] z-30 drop-shadow-2xl flex items-end justify-center">
             <svg viewBox="0 0 200 250" className="w-full h-full text-brand-light drop-shadow-2xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <path fill="currentColor" d="M100,20 C110,20 120,30 115,50 C115,55 125,55 125,65 C125,75 110,85 105,90 C115,110 145,115 160,135 C175,155 170,195 170,205 C170,215 175,225 175,235 C175,245 160,245 150,245 L50,245 C40,245 25,245 25,235 C25,225 30,215 30,205 C30,195 25,155 40,135 C55,115 85,110 95,90 C90,85 75,75 75,65 C75,55 85,55 85,50 C80,30 90,20 100,20 Z" />
             </svg>
         </div>
       </motion.div>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10 pt-10">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6 max-w-xl">
        <motion.p variants={fadeInLeft} className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-light/60 flex items-center gap-4">
          SIENCE 1984
        </motion.p>
        <motion.h1 variants={fadeInLeft} className="text-6xl lg:text-7xl leading-[1.1] text-brand-light font-ultra">
          Fresh <br/> Bakery <br/> Every Day
        </motion.h1>
        <motion.p variants={fadeInLeft} className="text-brand-light/70 mt-2 text-xs leading-relaxed max-w-[280px]">
          Even the all-powerful Pointing has no control about the blind texts it is an almost.
        </motion.p>
      </motion.div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-0 left-[45%] -translate-x-1/2 flex justify-center w-full z-10 items-end pointer-events-none"
    >
       <svg className="w-[600px] h-40 stroke-brand-olive translate-y-10" fill="none" strokeWidth="2">
          <path d="M0,100 Q50,30 100,100 T200,100 T300,100 T400,100 T500,100 T600,100" />
       </svg>
       <motion.div 
         animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}
         className="absolute bottom-8 left-[260px] w-12 h-12 rounded-full border border-brand-orange flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-brand-dark transition-colors cursor-pointer bg-brand-dark z-20 pointer-events-auto"
       >
          <ArrowDown size={18} strokeWidth={2} />
       </motion.div>
    </motion.div>
  </section>
);

const About = () => (
  <section className="bg-brand-beige text-brand-dark py-32 px-6 lg:px-24 overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft}
        className="relative h-[600px] w-full"
      >
         <div className="absolute top-[10%] left-[20%] w-[80%] h-[80%] bg-brand-olive rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 mix-blend-multiply"></div>
         <div className="absolute top-0 right-10 w-32 h-32 dot-pattern opacity-40"></div>
         
         <div className="absolute top-10 left-0 w-[60%] h-[60%] bg-brand-dark z-10"></div>
         <div className="absolute bottom-0 right-10 w-[60%] h-[60%] bg-gray-300 z-20 shadow-xl flex items-center justify-center overflow-hidden">
             <img
               src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80"
               alt="Bakery pastries"
               className="w-full h-full object-cover"
             />
         </div>
      </motion.div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col gap-10 lg:pl-12">
        <div>
          <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">
            About Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-5xl lg:text-6xl leading-[1.1]">
            Baking Special <br/> Moments
          </motion.h2>
        </div>
        
        <motion.div variants={fadeInUp} className="flex gap-6 mt-4">
          <div className="text-sm font-bold text-brand-dark/50 pt-1">01</div>
          <div>
            <h3 className="text-xl font-bold font-outfit mb-3">Last view back</h3>
            <p className="text-xs text-brand-dark/60 leading-relaxed max-w-sm mb-8">
              She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic.
            </p>
            
            <div className="flex flex-col gap-4">
               <div className="flex gap-4 items-center">
                 <button className="w-8 h-8 rounded-full bg-brand-dark text-brand-light flex items-center justify-center hover:scale-110 transition-transform"><ChevronUp size={16}/></button>
               </div>
               <div className="flex gap-4 items-center">
                 <button className="w-8 h-8 rounded-full bg-brand-dark text-brand-light flex items-center justify-center hover:scale-110 transition-transform"><ChevronDown size={16}/></button>
               </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <p className="text-xs font-semibold hover:text-brand-orange cursor-pointer transition-colors">On the skyline</p>
              <p className="text-xs font-semibold hover:text-brand-orange cursor-pointer transition-colors">Pityful a rethoric</p>
              <p className="text-xs font-semibold hover:text-brand-orange cursor-pointer transition-colors">On her way she</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="bg-brand-beige text-brand-dark pb-32 px-6 lg:px-24">
    <div className="text-center mb-16">
      <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">
        Our Features
      </motion.p>
      <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl lg:text-6xl">
        Baked With Love
      </motion.h2>
    </div>

    <motion.div 
      variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3"
    >
      {[
        { title: "Fresh", desc: "Nothing the copy said could convince her and so it didn't take long.", bg: "bg-brand-light", text: "text-brand-dark" },
        { title: "Natural", desc: "Copy Writers ambushed her, made her drunk with Longe and Parole.", bg: "bg-brand-light", text: "text-brand-dark" },
        { title: "Tasty", desc: "And if she hasn't been rewritten, then they are still using her.", bg: "bg-brand-olive", text: "text-brand-dark", special: true }
      ].map((item, i) => (
        <motion.div 
          key={i} variants={fadeInUp}
          className={`${item.bg} ${item.text} p-12 relative overflow-hidden flex flex-col justify-center min-h-[350px] hover:-translate-y-2 transition-transform duration-300`}
        >
          {item.special && <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange rounded-bl-full translate-x-10 -translate-y-10"></div>}
          <div className="mb-8 relative z-10">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={item.special ? "#f3d4af" : "#efa443"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              {i === 0 && <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3 M10 1v3 M14 1v3" />}
              {i === 1 && <path d="M20 21H4a2 2 0 0 1-2-2V9.5l10-4 10 4V19a2 2 0 0 1-2 2z M12 5.5v15.5 M2 9.5l10 4 10-4" />}
              {i === 2 && <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />}
            </svg>
          </div>
          <h3 className="text-3xl font-ultra mb-4 relative z-10">{item.title}</h3>
          <p className="text-xs text-brand-dark/60 leading-relaxed relative z-10 opacity-80 font-medium max-w-[80%]">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const VideoSection = () => (
  <section className="bg-brand-dark text-brand-light py-24 px-6 lg:px-24 relative overflow-hidden">
     <svg className="absolute top-10 right-10 w-64 h-24 stroke-brand-olive opacity-50" fill="none" strokeWidth="2">
        <path d="M0,20 Q40,40 80,20 T160,20 T240,20" />
     </svg>
     <svg className="absolute bottom-0 left-[40%] w-64 h-24 stroke-brand-olive opacity-50" fill="none" strokeWidth="2">
        <path d="M0,40 Q40,0 80,40 T160,40 T240,40" />
     </svg>
     
    <motion.div 
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10"
    >
      <motion.div variants={fadeInLeft} className="flex justify-center md:justify-end md:pr-24 relative">
        <div className="absolute top-0 right-[20%] w-32 h-32 dot-pattern-light opacity-30"></div>
        <div className="w-32 h-32 bg-brand-light rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-10 shadow-2xl">
          <Play className="text-brand-orange ml-2" size={32} fill="currentColor" />
        </div>
      </motion.div>
      <motion.div variants={fadeInRight}>
        <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-light/70 mb-4">
          Our Video
        </p>
        <h2 className="text-5xl lg:text-6xl max-w-md leading-[1.1]">
          Story Behind Every Piece
        </h2>
      </motion.div>
    </motion.div>
  </section>
);

const Products = () => (
  <section className="bg-brand-beige text-brand-dark py-32 px-6 lg:px-24">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
      <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">Our Products</p>
      <h2 className="text-5xl lg:text-6xl leading-[1.1]">Baked Fresh<br/>Every Morning</h2>
    </motion.div>

    <motion.div 
      variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <motion.div variants={fadeInUp} className="lg:col-span-1 bg-gray-400 flex flex-col relative group overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-gray-400">
           <img
             src="https://images.unsplash.com/photo-1549931319-a545749fcd16?auto=format&fit=crop&w=800&q=80"
             alt="Homemade bread"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-end p-8 text-brand-light">
          <p className="text-[10px] tracking-widest uppercase font-bold mb-2">Bakery</p>
          <h3 className="text-4xl font-ultra mb-4 max-w-[80%] leading-[1.1]">Homemade Bread</h3>
          <p className="text-xs opacity-70 mb-8 max-w-xs leading-relaxed">Flows by their place and supplies it with the necessary regelialia.</p>
          <span className="absolute bottom-8 right-8 text-5xl font-ultra">$9</span>
        </div>
      </motion.div>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { cat: "Bakery", title: "Bread", price: "$5", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
          { cat: "Pastry", title: "Cupcake", price: "$3", img: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80" },
          { cat: "Sweet", title: "Biscuits", price: "$2", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80" },
          { cat: "Pastry", title: "Brioche", price: "$5", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80" },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeInUp} className="bg-brand-light flex flex-col h-[300px] overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="h-[60%] bg-gray-300 w-full relative overflow-hidden">
               <img src={item.img} className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-500" alt={item.title} />
            </div>
            <div className="h-[40%] p-6 flex flex-col justify-center relative">
              <p className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50 mb-1">{item.cat}</p>
              <h3 className="text-xl font-outfit font-bold">{item.title}</h3>
              <span className="absolute bottom-6 right-6 text-3xl font-ultra text-brand-dark">{item.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16 flex justify-center">
       <button className="border border-brand-dark/20 px-10 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-brand-dark hover:text-brand-light transition-all">
         Explore
       </button>
    </motion.div>
  </section>
);

const HowWeWork = () => (
  <section className="bg-brand-dark text-brand-light pt-32 pb-0 px-6 lg:px-24 relative overflow-hidden flex flex-col items-center">
    <svg className="absolute top-10 left-0 w-64 h-64 stroke-brand-olive opacity-80" fill="none" strokeWidth="2">
        <path d="M0,50 Q40,10 80,50 T160,50 T240,50" />
    </svg>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16 relative z-10 w-full">
      <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-light/70 mb-4">Our Process</p>
      <h2 className="text-5xl lg:text-6xl">How We Work</h2>
    </motion.div>

    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mt-8">
      {[
        { step: "01", title: "Contact", desc: "Nothing the copy said could convince her and so it didn't take long.", bg: "bg-brand-light", text: "text-brand-dark" },
        { step: "02", title: "Baking", desc: "The copy said could convince her and so it didn't take long.", bg: "bg-brand-olive", text: "text-brand-dark", special: true },
        { step: "03", title: "Delivery", desc: "Nothing the copy said could convince her and so it didn't take long.", bg: "bg-brand-light", text: "text-brand-dark" },
        { step: "04", title: "Tasty", desc: "Copy said could convince her and so it didn't take long.", bg: "bg-brand-light", text: "text-brand-dark" }
      ].map((item, i) => (
        <motion.div key={i} variants={fadeInUp} className={`${item.bg} ${item.text} p-10 pt-16 pb-24 relative overflow-hidden flex flex-col items-start hover:-translate-y-2 transition-transform`}>
          {item.special && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange rounded-bl-full translate-x-4 -translate-y-4"></div>}
          <div className="text-[10px] font-bold mb-16 relative z-10 opacity-60">{item.step}</div>
          <h3 className="text-3xl font-ultra mb-6 relative z-10">{item.title}</h3>
          <p className="text-xs opacity-70 leading-relaxed relative z-10 font-medium max-w-[85%]">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const Recipes = () => (
  <section className="bg-brand-dark text-brand-light py-32 px-6 lg:px-24 relative overflow-hidden">
     <svg className="absolute top-0 right-0 w-64 h-64 stroke-brand-olive fill-none" strokeWidth="2">
         <path d="M100,0 Q50,50 100,100 T200,100" />
     </svg>
     <div className="absolute top-10 right-10 w-32 h-32 dot-pattern-light opacity-30"></div>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 relative z-10">
      <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-light/70 mb-4">Our Recipes</p>
      <h2 className="text-5xl lg:text-6xl leading-[1.1] max-w-xl">Explore Sweet &<br/>Delicious Recipes</h2>
    </motion.div>

    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
      <motion.div variants={fadeInUp} className="lg:col-span-1 bg-brand-light text-brand-dark flex flex-col h-[500px] group overflow-hidden">
        <div className="h-[60%] bg-gray-400 w-full relative overflow-hidden">
           <img
             src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80"
             alt="Delicious bread"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="h-[40%] p-8 flex flex-col justify-center relative bg-brand-light z-10">
          <p className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50 mb-2">Bakery</p>
          <h3 className="text-3xl font-ultra mb-4">Delicious Bread</h3>
          <p className="text-xs opacity-70 leading-relaxed max-w-[70%]">Flows by their place and supplies it with the necessary regelialia.</p>
          <div className="absolute bottom-8 right-8 flex items-center gap-2 font-bold text-sm">
             <Clock size={16} /> 5 min
          </div>
        </div>
      </motion.div>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { cat: "Bakery", title: "Malted wheat flake bread", time: "10 min", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80" },
          { cat: "Bakery", title: "Biscoff cake with lotus biscuits", time: "7 min", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
          { cat: "Bakery", title: "Peanut butter and chocolate cake", time: "5 min", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80" },
          { cat: "Bakery", title: "Malted wheat flake bread", time: "15 min", img: "https://images.unsplash.com/photo-1585478259715-4d3f1c2f5b91?auto=format&fit=crop&w=600&q=80" },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeInUp} className="bg-brand-light text-brand-dark flex flex-col h-[240px] group overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="h-[55%] bg-gray-300 w-full relative overflow-hidden">
               <img src={item.img} className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-500" alt={item.title} />
            </div>
            <div className="h-[45%] p-6 flex flex-col relative bg-brand-light z-10">
              <div className="flex justify-between items-center mb-3">
                 <p className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50">{item.cat}</p>
                 <div className="flex items-center gap-1 text-[10px] font-bold text-brand-dark/70">
                    <Clock size={12} /> {item.time}
                 </div>
              </div>
              <h3 className="text-sm font-outfit font-bold pr-4 leading-snug">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16 flex justify-center relative z-10">
       <button className="border border-brand-light/20 px-10 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-brand-light hover:text-brand-dark transition-all">
         Explore
       </button>
    </motion.div>
    
    <svg className="absolute bottom-0 left-0 w-64 h-32 stroke-brand-olive opacity-80" fill="none" strokeWidth="2">
        <path d="M0,50 Q40,10 80,50 T160,50 T240,50" />
    </svg>
  </section>
);

const TeamAndTestimonials = () => (
  <section className="bg-brand-beige text-brand-dark pt-32 pb-24 px-6 lg:px-24 overflow-hidden relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft}>
        <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">Our Baker</p>
        <h2 className="text-5xl lg:text-6xl leading-[1.1] mb-12">Meet Our<br/>Professional<br/>Baker</h2>
        
        <div className="flex flex-col gap-6 pl-4 border-l-2 border-brand-dark/10 relative">
          <div className="absolute -left-[1px] top-4 w-[2px] h-12 bg-brand-dark"></div>
          <div>
            <p className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50 mb-2">Baker</p>
            <h3 className="text-lg font-bold font-outfit mb-3">Stina Gunnarsdottir</h3>
            <p className="text-xs text-brand-dark/60 leading-relaxed max-w-xs mb-8">
              She packed her seven versalia, put her initial into the belt and made herself on the way.
            </p>
          </div>
          
          <div className="absolute -left-12 top-10 flex flex-col gap-2">
             <button className="w-8 h-8 rounded-full bg-brand-dark text-brand-light flex items-center justify-center hover:scale-110 transition-transform"><ChevronUp size={16}/></button>
             <button className="w-8 h-8 rounded-full bg-brand-dark text-brand-light flex items-center justify-center hover:scale-110 transition-transform"><ChevronDown size={16}/></button>
          </div>
          
          <div className="flex flex-col gap-4">
             <p className="text-xs font-semibold hover:text-brand-orange cursor-pointer transition-colors">Jaquon Hart</p>
             <p className="text-xs font-semibold hover:text-brand-orange cursor-pointer transition-colors">Oluchi Mazi</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight} className="relative flex justify-end items-center h-[500px]">
        <div className="absolute top-[10%] right-[10%] w-[80%] h-[90%] bg-brand-olive rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 mix-blend-multiply"></div>
        <div className="absolute top-0 right-1/2 w-32 h-32 dot-pattern opacity-40 z-0"></div>
        <svg className="absolute -top-10 right-20 w-64 h-32 stroke-brand-orange fill-none" strokeWidth="3">
           <path d="M0,50 Q40,10 80,50 T160,50" />
        </svg>
        <div className="w-[80%] h-full bg-brand-light z-10 shadow-2xl relative overflow-hidden">
           <img
             src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
             alt="Professional baker"
             className="w-full h-full object-cover"
           />
        </div>
      </motion.div>
    </div>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
      <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">Testimonials</p>
      <h2 className="text-5xl lg:text-6xl leading-[1.1]">People Say About<br/>Our Bakery</h2>
    </motion.div>

    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      {[
        { title: "Very, Very Delicious", desc: "\"Nothing the copy said could convince her and so it didn't take long. A small river named Duden flows by their\"", bg: "bg-brand-light", text: "text-brand-dark" },
        { title: "Best Bakery in Town", desc: "\"Copy Writers ambushed her, made her drunk with Longe and Parole. A small river named Duden flows by their place\"", bg: "bg-brand-olive", text: "text-brand-dark" },
        { title: "Well Organized", desc: "\"And if she hasn't been rewritten, then they are still using her. A small river named Duden flows by their place\"", bg: "bg-brand-light", text: "text-brand-dark" }
      ].map((item, i) => (
        <motion.div key={i} variants={fadeInUp} className={`${item.bg} ${item.text} p-10 flex flex-col justify-between min-h-[300px] hover:-translate-y-2 transition-transform`}>
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-1 text-brand-orange pt-2">
              {[...Array(5)].map((_, idx) => (
                <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <div className={`w-14 h-14 rounded-full ${item.bg === 'bg-brand-olive' ? 'bg-brand-light/50' : 'bg-gray-300'} overflow-hidden`}></div>
          </div>
          <div>
            <h3 className="text-xl font-outfit font-bold mb-4 pr-8 leading-snug">{item.title}</h3>
            <p className="text-xs opacity-70 leading-relaxed font-medium">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
    
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-center gap-3 mt-12">
       <div className="w-2 h-2 rounded-full bg-brand-dark"></div>
       <div className="w-2 h-2 rounded-full bg-brand-olive"></div>
       <div className="w-2 h-2 rounded-full bg-brand-olive"></div>
    </motion.div>
  </section>
);

const Contact = () => (
  <section className="bg-brand-beige text-brand-dark py-32 px-6 lg:px-24 overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft} className="relative h-[600px] w-[80%]">
        <div className="absolute top-[20%] left-[20%] w-[100%] h-[80%] bg-brand-olive rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 mix-blend-multiply"></div>
        <div className="absolute top-10 right-0 w-32 h-32 dot-pattern opacity-40 z-0"></div>
        <svg className="absolute -top-10 left-20 w-64 h-32 stroke-brand-orange fill-none" strokeWidth="3">
           <path d="M0,50 Q40,10 80,50 T160,50" />
        </svg>
        <div className="w-full h-[90%] mt-[10%] bg-brand-light z-10 shadow-2xl relative overflow-hidden">
           <img
             src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80"
             alt="Bakery storefront"
             className="w-full h-full object-cover"
           />
        </div>
      </motion.div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col gap-16 lg:pl-12">
        <div>
          <motion.p variants={fadeInUp} className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-dark/70 mb-4">Get In Touch</motion.p>
          <motion.h2 variants={fadeInUp} className="text-5xl lg:text-7xl leading-[1.1]">Contact<br/>With Us</motion.h2>
        </div>
        
        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-4">
          <div className="flex flex-col gap-4">
             <div className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50">01</div>
             <div className="flex gap-4">
               <div className="w-10 h-10 bg-brand-dark text-brand-light rounded-full flex items-center justify-center shrink-0">
                 <MapPin size={18} />
               </div>
               <div>
                 <h4 className="font-bold text-lg mb-2 font-outfit">Address</h4>
                 <p className="text-xs text-brand-dark/60 font-medium">784 Richardson Rd.<br/>New York, NY 10001</p>
               </div>
             </div>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="text-[10px] tracking-widest uppercase font-bold text-brand-dark/50">02</div>
             <div className="flex gap-4">
               <div className="w-10 h-10 bg-brand-dark text-brand-light rounded-full flex items-center justify-center shrink-0">
                 <Phone size={18} />
               </div>
               <div>
                 <h4 className="font-bold text-lg mb-2 font-outfit">Phone</h4>
                 <p className="text-xs text-brand-dark/60 font-medium">+1 (234) 567-89-02<br/>Mon-Fri 8:00 - 18:00</p>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-outfit overflow-x-hidden selection:bg-brand-orange selection:text-brand-dark">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <VideoSection />
      <Products />
      <HowWeWork />
      <Recipes />
      <TeamAndTestimonials />
      <Contact />
    </div>
  );
}

export default App;