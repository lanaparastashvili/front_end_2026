"use client";

import React, { useState } from "react";
import { DecorativeRings } from "./DecorativeRings";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Can't be empty";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Can't be empty";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Sorry, invalid format here";
    }

    if (!form.message.trim()) {
      newErrors.message = "Can't be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending email / webhook
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4EE1A0", "#FFFFFF", "#75F3BD"],
      });
    } catch {
      // safe fallback
    }

    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="relative bg-[#242424] -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-28 px-4 sm:px-8 md:px-16 lg:px-28 pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden">
      {/* Decorative Rings on bottom-left */}
      <div className="absolute -left-48 sm:-left-36 bottom-20 z-0 pointer-events-none opacity-40">
        <DecorativeRings />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Column: Heading & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 text-center lg:text-left"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Contact
          </h2>
          <p className="text-base sm:text-lg text-[#D9D9D9] font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
            I would love to hear about your project and how I could help. Please
            fill in the form, and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6"
        >
          {submitted ? (
            <div className="p-8 bg-[#151515] rounded-xl border border-[#4EE1A0]/40 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
              <CheckCircle2 className="w-12 h-12 text-[#4EE1A0]" />
              <h3 className="text-2xl font-bold text-white">Thank You!</h3>
              <p className="text-[#D9D9D9]">
                Your message has been sent successfully. I will get back to you shortly!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-[#4EE1A0] underline uppercase tracking-wider"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="NAME"
                  value={form.name}
                  onChange={handleChange}
                  className={`custom-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <div className="flex items-center justify-end gap-1 mt-1.5 text-right text-xs text-[#FF6F5B]">
                    <AlertCircle className="w-4 h-4 text-[#FF6F5B]" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="EMAIL"
                  value={form.email}
                  onChange={handleChange}
                  className={`custom-input ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                  <div className="flex items-center justify-end gap-1 mt-1.5 text-right text-xs text-[#FF6F5B]">
                    <AlertCircle className="w-4 h-4 text-[#FF6F5B]" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="MESSAGE"
                  value={form.message}
                  onChange={handleChange}
                  className={`custom-input resize-none ${errors.message ? "error" : ""}`}
                />
                {errors.message && (
                  <div className="flex items-center justify-end gap-1 mt-1.5 text-right text-xs text-[#FF6F5B]">
                    <AlertCircle className="w-4 h-4 text-[#FF6F5B]" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="link-underline text-white hover:text-[#4EE1A0] text-base font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Decorative separator line before footer */}
      <div className="max-w-7xl mx-auto w-full h-[1px] bg-[#FFFFFF]/20 mt-16 md:mt-24" />
    </section>
  );
};
