"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import SectionHeader from "./SectionHeader";

const pricingPackages = [
  {
    name: "Launchpad",
    price: "$499",
    description: "Perfect for launching a basic online presence",
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "🖥️ Design & Development",
      "Single-page responsive website with high-impact design",
      "Mobile-first design optimized for smartphones & tablets",
      "Next-day turnaround: Fully published within 24 hours",
      "",
      "⚙️ Integrations & Performance",
      "Secure contact form integration",
      "Full social media integration",
      "Basic SEO: Essential on-page optimization",
      "Basic analytics platform setup (Google Analytics)",
      "",
      "🌐 Hosting & Support",
      "Simple 1-year domain registration included",
      "Free lifetime web hosting on optimized servers",
      "1 month of post-launch support & bug fixes"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "Starting at $1,499+",
    description: "Ideal for growing businesses with advanced features",
    gradient: "from-purple-600 to-pink-600",
    features: [
      "💻 Development & Design",
      "Custom-built website: 5-25 pages, responsive design",
      "Custom design & branding aligned with your identity",
      "Blog/CMS integration (+$1,000 for custom admin panel)",
      "Comprehensive performance optimization",
      "",
      "📈 Marketing & SEO",
      "Advanced SEO optimization for organic traffic",
      "Google My Business & Facebook Business Page setup",
      "Small business social media campaigns",
      "Advanced analytics & tracking for deep insights",
      "Email marketing platform integration",
      "Local premium ad campaigns available (add-on)",
      "",
      "🔒 Integrations & Functionality",
      "Optional basic e-commerce & Stripe payment integration",
      "FB Messenger or AI chatbot widget for support",
      "Lead management & financial systems integration",
      "Custom business forms & PDFs tailored to your needs",
      "Third-party application support available",
      "Basic AI integration (API/service fees not included)",
      "",
      "⭐ Support & Flexibility",
      "6 months of post-launch support & maintenance",
      "Extra features available upon request"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom Pricing (Contact Sales)",
    description: "Ultimate solution for high-growth businesses",
    gradient: "from-indigo-600 to-violet-600",
    features: [
      "💻 Platform & Development",
      "Full custom solution: Unlimited pages, custom design, bespoke development",
      "Maximum scalability: Cloud hosting on dedicated servers for peak traffic",
      "Custom features & APIs: Bespoke functionality, integrations, custom endpoints",
      "Core infrastructure: Automated backups (50GB offsite), DNS/subdomain management, .com domain guarantee",
      "",
      "🛒 E-Commerce & Functionality",
      "Advanced e-commerce: Unlimited products, custom product pages, automated ordering",
      "Third-party integration: Seamless connection to Shopify, Magento, custom cart/order processing",
      "Secure payment processing: Stripe, Square POS, PayPal POS, and other leading payment APIs",
      "Enhanced security: SSO/OAuth support, SSL certificates, encryption for data safety",
      "",
      "🛡️ Security & Performance",
      "Priority hosting: 24/7 uptime monitoring & management on dedicated servers",
      "Security assurance: Regular audits, optimizations, 24/7 threat protection",
      "",
      "📈 Brand Launch & Marketing",
      "Full-spectrum launch campaign: Custom branding, 3-month pre-launch campaign (social, newspaper, TV, radio)",
      "Branded promotional materials: Vehicle wraps, banners, mugs, business forms, promotional videos",
      "Digital presence: Reputation management, Google My Business personalization",
      "Integrated AI solutions for business efficiency",
      "",
      "⭐ Support & Training",
      "Dedicated account manager",
      "1-year priority support included",
      "Comprehensive training & documentation for admins, users, developers",
      "Enterprise email: Up to 100+ custom email accounts unique to your domain",
      "Multi-language support for global reach"
    ],
    popular: false
  }
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A Basic package typically takes 2-3 weeks, Professional packages take 4-6 weeks, and Enterprise solutions can take 8-12 weeks or more depending on custom requirements."
  },
  {
    question: "What's included in post-launch support?",
    answer: "Post-launch support includes bug fixes, minor content updates, technical assistance, and guidance on using your website. The duration varies by package: 1 month for Basic, 3 months for Professional, and 6 months for Enterprise."
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "I can help you set up hosting and domain registration, or work with your existing providers. I recommend Vercel for hosting (which offers excellent performance and free tier options) and can guide you through the entire setup process."
  },
  {
    question: "What are your payment terms?",
    answer: "Projects typically follow a 50% deposit to begin work, 25% at the midpoint milestone, and 25% upon completion. For Enterprise packages, we can arrange custom payment schedules to fit your budget."
  },
  {
    question: "Can I request revisions during development?",
    answer: "Absolutely! Each package includes revision rounds at key milestones. Basic includes 2 revision rounds, Professional includes 3 rounds, and Enterprise includes unlimited revisions during the development phase."
  },
  {
    question: "What technologies do you use?",
    answer: "I primarily use modern, industry-standard technologies including Next.js, React, TypeScript, and Tailwind CSS. The specific tech stack is chosen based on your project requirements to ensure optimal performance, scalability, and maintainability."
  }
];

export default function ServicesSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    trackEvent(AnalyticsEvents.FAQ_TOGGLED, { question_index: index });
  };

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <SectionHeader
        heading="Web Design & Development Services"
        description="Transform your vision into a stunning digital presence with custom web solutions tailored to your business needs."
        tagIcon="solar:code-square-bold"
        tagText="Services"
        centered={true}
      />

      {/* Featured Offer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-16 relative"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/10 via-blue-600/10 to-cyan-600/10 dark:from-indigo-600/20 dark:via-blue-600/20 dark:to-cyan-600/20 border border-indigo-200 dark:border-indigo-800 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600">
                <Icon icon="solar:database-bold" className="text-white" width={48} height={48} />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                  Core System Integration and Data Strategy
                </h3>
              </div>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-base leading-relaxed">
                We provide <strong>complete administrative (CMS) integration</strong> featuring custom-designed data schemas that are precisely tailored to your unique internal systems and backend infrastructure.
              </p>

              <p className="text-base leading-relaxed">
                Our approach prioritizes a <strong>&quot;system-first&quot;</strong> design:
              </p>

              <div className="space-y-4">
                <div className="pl-4 border-l-4 border-indigo-500 dark:border-indigo-400">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Your Data, Your Rules:</p>
                  <p className="text-sm leading-relaxed">
                    We build the database and integration logic based on <strong>your business terminology and data models</strong> <em>(your verbage and vernacular)</em>. This ensures you retain full ownership and control, and your team never has to learn or adapt to an external company&apos;s data structure.
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Seamless Interoperability:</p>
                  <p className="text-sm leading-relaxed">
                    Data sent to or received from <strong>third-party systems</strong> is automatically handled by our integration layer. Your native data is <strong>translated</strong> to meet external requirements upon export, and incoming data is <strong>converted</strong> to match your established internal preferences.
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-cyan-500 dark:border-cyan-400">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Advanced Technology:</p>
                  <p className="text-sm leading-relaxed">
                    The system utilizes modern databases capable of managing both static and dynamic edge application and page routing for optimal performance and flexibility.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/30 dark:to-cyan-900/30 border border-indigo-200 dark:border-indigo-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  <strong>In short:</strong> We create a custom, high-performance data backbone that speaks your company&apos;s language and effortlessly handles all external data exchange.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackEvent(AnalyticsEvents.PRICING_CTA_CLICKED, { package: "enterprise", location: "featured" })}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
                >
                  Learn More About Custom Integration
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {pricingPackages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg">
                  BEST VALUE
                </div>
              </div>
            )}
            
            <div className={`h-full rounded-2xl bg-white dark:bg-gray-800 border-2 ${
              pkg.popular 
                ? 'border-purple-500 dark:border-purple-600 shadow-xl shadow-purple-500/20' 
                : 'border-gray-200 dark:border-gray-700'
            } p-8 hover:shadow-2xl transition-all duration-300 ${
              pkg.popular ? 'scale-105' : 'hover:scale-105'
            }`}>
              <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${pkg.gradient} mb-6`}>
                <h3 className="text-white font-bold text-xl">{pkg.name}</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.price}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => {
                  // Skip empty strings (separators)
                  if (feature === "") {
                    return <li key={idx} className="h-2"></li>;
                  }
                  
                  // Check if it's a category header (starts with emoji)
                  const isCategory = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(feature);
                  
                  if (isCategory) {
                    return (
                      <li key={idx} className="font-bold text-gray-900 dark:text-white text-sm mt-4 mb-2">
                        {feature}
                      </li>
                    );
                  }
                  
                  return (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                      <Icon 
                        icon="solar:check-circle-bold" 
                        className={`flex-shrink-0 mt-0.5 bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}
                        width={20} 
                        height={20} 
                      />
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>

              <Link href={`/services?package=${pkg.name.toLowerCase()}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackEvent(AnalyticsEvents.PRICING_CTA_CLICKED, { package: pkg.name.toLowerCase(), location: "pricing_card" })}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? `bg-gradient-to-r ${pkg.gradient} text-white shadow-lg shadow-purple-500/30 hover:shadow-xl`
                      : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Choose {pkg.name}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true }}
        className="mb-16 max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Additional Features Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance any package with these add-ons at a low one-time cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "solar:shop-bold", name: "E-commerce Integration", desc: "Add shopping cart and payment processing" },
              { icon: "solar:document-text-bold", name: "Blog/CMS System", desc: "Manage your own content easily" },
              { icon: "solar:chat-round-bold", name: "Live Chat Widget", desc: "Real-time customer support" },
              { icon: "solar:calendar-bold", name: "Booking System", desc: "Appointment scheduling functionality" },
              { icon: "solar:letter-bold", name: "Email Marketing Integration", desc: "Newsletter and email campaigns" },
              { icon: "solar:users-group-rounded-bold", name: "User Authentication", desc: "Login and member areas" },
              { icon: "solar:translation-bold", name: "Multi-language Support", desc: "Reach international audiences" },
              { icon: "solar:database-bold", name: "Custom Database Integration", desc: "Connect to external data sources" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                  <Icon icon={feature.icon} className="text-white" width={24} height={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contact us to discuss pricing for additional features tailored to your needs
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Got questions? I&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon 
                    icon="solar:alt-arrow-down-bold" 
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0" 
                    width={24} 
                    height={24} 
                  />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedFaq === index ? "auto" : 0,
                  opacity: expandedFaq === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions? Let&apos;s chat!
          </p>
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300"
            >
              Start Your Project
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
