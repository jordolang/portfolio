"use client";

import { Background, Footer, Navigation } from "@/components/portfolio";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { AnalyticsEvents, identifyUser, trackEvent } from '@/lib/analytics';

interface AdditionalFeature {
  icon: string;
  name: string;
  desc: string;
  price: number;
}

interface Package {
  name: string;
  price: string;
  basePrice: number | null;
  gradient: string;
  features: string[];
}

const additionalFeatures: AdditionalFeature[] = [
  { icon: "solar:shop-bold", name: "E-commerce Integration", desc: "Shopping cart & payment processing", price: 299 },
  { icon: "solar:document-text-bold", name: "Blog/CMS System", desc: "Manage your own content easily", price: 99 },
  { icon: "solar:chat-round-bold", name: "Live Chat Widget", desc: "Real-time customer support", price: 99 },
  { icon: "solar:calendar-bold", name: "Booking System", desc: "Appointment scheduling functionality", price: 199 },
  { icon: "solar:letter-bold", name: "Email Marketing Integration", desc: "Newsletter and email campaigns", price: 49 },
  { icon: "solar:users-group-rounded-bold", name: "User Authentication", desc: "Login and member areas", price: 99 },
  { icon: "solar:translation-bold", name: "Multi-language Support", desc: "Reach international audiences", price: 199 },
  { icon: "solar:database-bold", name: "Custom Database Integration", desc: "Connect to external data sources", price: 199 },
  { icon: "solar:gallery-bold", name: "Advanced Photo Gallery", desc: "Professional image showcase", price: 39 },
  { icon: "solar:video-frame-bold", name: "Video Background/Hero", desc: "Dynamic video presentation", price: 49 },
  { icon: "solar:graph-new-bold", name: "Analytics Dashboard", desc: "Custom reporting & insights", price: 99 },
  { icon: "solar:map-point-bold", name: "Interactive Maps", desc: "Location features & directions", price: 49 },
  { icon: "solar:review-bold", name: "Review System", desc: "Customer reviews & ratings", price: 99 },
  { icon: "solar:bell-bold", name: "Push Notifications", desc: "Real-time user notifications", price: 199 },
  { icon: "solar:document-add-bold", name: "Advanced Forms", desc: "Custom forms & lead capture", price: 99 },
  { icon: "solar:chart-bold", name: "Data Visualization", desc: "Charts, graphs & metrics", price: 99 },
  { icon: "solar:share-bold", name: "Social Media Feed", desc: "Display your social content", price: 99 },
  { icon: "solar:shield-check-bold", name: "Advanced Security", desc: "2FA, encryption & monitoring", price: 99 },
  { icon: "solar:document-bold", name: "PDF Generation", desc: "Dynamic document creation", price: 99 },
  { icon: "solar:box-bold", name: "Inventory Management", desc: "Track products & stock", price: 199 },
  { icon: "solar:hashtag-bold", name: "Forum/Community", desc: "User discussion platform", price: 49 },
  { icon: "solar:ticket-bold", name: "Event Ticketing", desc: "Sell & manage event tickets", price: 199 }
];

const packages: Record<string, Package> = {
  launchpad: {
    name: "Launchpad",
    price: "$499",
    basePrice: 499,
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
    ]
  },
  professional: {
    name: "Professional",
    price: "Starting at $1,499+",
    basePrice: 1499,
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
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "Custom Pricing (Contact Sales)",
    basePrice: null,
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
    ]
  }
};

export default function ServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("launchpad");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    projectDescription: "",
    budget: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Get package and feature from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageParam = params.get('package');
    const featureParam = params.get('feature');
    
    if (packageParam && packages[packageParam as keyof typeof packages]) {
      setSelectedPackage(packageParam);
    }
    
    if (featureParam && additionalFeatures.find(f => f.name === featureParam)) {
      setSelectedFeatures(prev => {
        if (!prev.includes(featureParam)) {
          trackEvent(AnalyticsEvents.FEATURE_ADDED, { feature_name: featureParam });
          return [...prev, featureParam];
        }
        return prev;
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPackage = e.target.value;
    setSelectedPackage(newPackage);
    trackEvent(AnalyticsEvents.PACKAGE_SELECTED, { package: newPackage });
    
    // Clear features if switching to Professional or Enterprise (they include most features)
    if (newPackage !== 'launchpad') {
      setSelectedFeatures([]);
    }
  };

  const toggleFeature = (featureName: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureName)) {
        trackEvent(AnalyticsEvents.FEATURE_REMOVED, { feature_name: featureName });
        return prev.filter(f => f !== featureName);
      } else {
        trackEvent(AnalyticsEvents.FEATURE_ADDED, { feature_name: featureName });
        return [...prev, featureName];
      }
    });
  };

  const calculateTotalPrice = () => {
    const pkg = packages[selectedPackage as keyof typeof packages];
    if (!pkg.basePrice || selectedPackage !== 'launchpad') {
      return null; // Don't calculate for Professional/Enterprise
    }
    
    const featuresTotal = selectedFeatures.reduce((total, featureName) => {
      const feature = additionalFeatures.find(f => f.name === featureName);
      return total + (feature?.price || 0);
    }, 0);
    
    return pkg.basePrice + featuresTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.businessName.trim() || !formData.contactName.trim()) {
      alert('Please enter your business and contact name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      alert('Please describe your project requirements.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    // Prepare package info outside try block for error logging
    const packageInfo = packages[selectedPackage as keyof typeof packages];
    const totalPrice = calculateTotalPrice();
    const selectedFeaturesList = selectedFeatures.map(featureName => {
      const feature = additionalFeatures.find(f => f.name === featureName);
      return feature ? `${feature.name} (+$${feature.price})` : featureName;
    }).join(', ');
    const priceDisplay = totalPrice ? `$${totalPrice}` : packageInfo.price;

    try {
      
      // Format message to match the contact form template structure
      const serviceMessage = `🎯 NEW SERVICE ORDER REQUEST

📋 Business Information:
Business Name: ${formData.businessName}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}

📦 Package Details:
Selected Package: ${packageInfo.name}
Price: ${priceDisplay}${selectedFeatures.length > 0 ? `\n\nAdditional Features:\n${selectedFeaturesList}` : ''}

📝 Project Description:
${formData.projectDescription}

💰 Budget: ${formData.budget || 'Not specified'}
⏱️ Timeline: ${formData.timeline || 'Not specified'}`;
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.contactName,
          from_email: formData.email,
          message: serviceMessage,
          to_email: 'jordan@jlang.dev',
        },
        publicKey
      );

      console.log('Order form sent successfully:', result);
      
      trackEvent(AnalyticsEvents.SERVICE_ORDER_SUBMITTED, { 
        package: selectedPackage,
        status: 'success' 
      });
      
      identifyUser(formData.email, formData.contactName, {
        business_name: formData.businessName,
        phone: formData.phone,
        selected_package: packageInfo.name,
        budget: formData.budget,
        timeline: formData.timeline,
        order_method: 'services_page',
      });
      
      setSubmitStatus('success');
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        projectDescription: "",
        budget: "",
        timeline: ""
      });

    } catch (error) {
      console.error('Failed to send order form:', error);
      console.error('EmailJS Configuration:', {
        serviceId,
        templateId,
        publicKey: publicKey.substring(0, 10) + '...',
      });
      console.error('Form data being sent:', {
        from_name: formData.contactName,
        from_email: formData.email,
        business_name: formData.businessName,
        phone: formData.phone,
        selected_package: `${packageInfo.name} (${priceDisplay})`,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        additional_features: selectedFeaturesList || 'None',
      });
      
      trackEvent(AnalyticsEvents.SERVICE_ORDER_SUBMITTED, { 
        package: selectedPackage,
        status: 'error',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPackage = packages[selectedPackage as keyof typeof packages];

  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      <Background />
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-600/30 dark:to-purple-600/30 border border-indigo-300 dark:border-indigo-700 mb-6"
            >
              <Icon icon="solar:document-add-bold" width={20} height={20} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Start Your Project</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
            >
              Let&apos;s Build Something Amazing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Fill out the form below to get started with your custom web solution. I&apos;ll review your requirements and get back to you within 24 hours.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Project Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                      placeholder="Your Business Name"
                    />
                  </div>

                  {/* Contact Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="Your Full Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Package */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="package" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Selected Package *
                      </label>
                      <select
                        id="package"
                        value={selectedPackage}
                        onChange={handlePackageChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                      >
                        <option value="launchpad">Launchpad - $499</option>
                        <option value="professional">Professional - Starting at $1,499+</option>
                        <option value="enterprise">Enterprise - Custom Pricing</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, goals, target audience, and any specific features you need..."
                    />
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range (Optional)
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="e.g., $5,000 - $10,000"
                      />
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Timeline (Optional)
                      </label>
                      <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300"
                        placeholder="e.g., 4-6 weeks"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Icon icon="solar:refresh-bold" className="animate-spin" width={24} height={24} />
                        Sending...
                      </span>
                    ) : (
                      'Submit Project Request'
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:check-circle-bold" className="text-green-600 dark:text-green-400" width={24} height={24} />
                        <div>
                          <p className="font-semibold text-green-800 dark:text-green-300">Request Submitted Successfully!</p>
                          <p className="text-sm text-green-700 dark:text-green-400">I&apos;ll review your project and get back to you within 24 hours.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:danger-circle-bold" className="text-red-600 dark:text-red-400" width={24} height={24} />
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-300">Submission Failed</p>
                          <p className="text-sm text-red-700 dark:text-red-400">Please try again or email me directly at jordan@jlang.dev</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Package Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32">
                <div className={`bg-gradient-to-br ${currentPackage.gradient} rounded-2xl p-8 text-white shadow-xl`}>
                  <h3 className="text-2xl font-bold mb-2">{currentPackage.name} Package</h3>
                  <p className="text-3xl font-bold mb-6">{currentPackage.price}</p>

                  <div className="space-y-3">
                    <p className="font-semibold mb-3">Includes:</p>
                    {currentPackage.features.map((feature, index) => {
                      // Skip empty strings (separators)
                      if (feature === "") {
                        return <div key={index} className="h-2"></div>;
                      }
                      
                      // Check if it's a category header (starts with emoji)
                      const isCategory = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(feature);
                      
                      if (isCategory) {
                        return (
                          <div key={index} className="font-bold text-sm mt-4 mb-2">
                            {feature}
                          </div>
                        );
                      }
                      
                      return (
                        <div key={index} className="flex items-start gap-2">
                          <Icon icon="solar:check-circle-bold" className="flex-shrink-0 mt-1" width={20} height={20} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Features Display - Only for Launchpad */}
                {selectedPackage === 'launchpad' && selectedFeatures.length > 0 && (
                  <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-400 dark:border-blue-500 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Additional Features</h4>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        {selectedFeatures.length} selected
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {selectedFeatures.map(featureName => {
                        const feature = additionalFeatures.find(f => f.name === featureName);
                        if (!feature) return null;
                        
                        return (
                          <div key={featureName} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Icon icon={feature.icon} className="text-blue-600 dark:text-blue-400 flex-shrink-0" width={16} height={16} />
                              <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{feature.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-gray-900 dark:text-white">${feature.price}</span>
                              <button
                                onClick={() => toggleFeature(featureName)}
                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                aria-label="Remove feature"
                              >
                                <Icon icon="solar:close-circle-bold" className="text-red-500" width={16} height={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">Estimated Total:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                          ${calculateTotalPrice()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Final price will be confirmed after reviewing your requirements
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Need Help Choosing?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Not sure which package is right for you? Let&apos;s discuss your needs and find the perfect solution.
                  </p>
                  <Link 
                    href="/#contact"
                    className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-2"
                  >
                    Contact Me
                    <Icon icon="solar:arrow-right-bold" width={16} height={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Additional Features Available
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {selectedPackage === 'launchpad' 
                  ? 'Click features to add them to your package estimate'
                  : 'Most features are included in Professional and Enterprise packages at no extra cost'}
              </p>
              {selectedPackage === 'launchpad' && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  * Prices shown are one-time add-on costs for the Launchpad Package
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFeatures.map((feature, index) => {
                const isSelected = selectedFeatures.includes(feature.name);
                const isLaunchpad = selectedPackage === 'launchpad';
                
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.02 }}
                    onClick={() => isLaunchpad && toggleFeature(feature.name)}
                    disabled={!isLaunchpad}
                    whileHover={isLaunchpad ? { scale: 1.03, y: -3 } : {}}
                    whileTap={isLaunchpad ? { scale: 0.98 } : {}}
                    className={`flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 transition-all duration-300 text-left ${
                      isLaunchpad
                        ? `cursor-pointer ${
                            isSelected
                              ? 'border-2 border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/20'
                              : 'border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
                          }`
                        : 'border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                        isSelected && isLaunchpad
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600 scale-110'
                          : 'bg-gradient-to-br from-blue-600 to-cyan-600 opacity-70'
                      }`}>
                        <Icon icon={feature.icon} className="text-white" width={24} height={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm flex items-center gap-2">
                          {feature.name}
                          {isSelected && isLaunchpad && (
                            <Icon icon="solar:check-circle-bold" className="text-blue-600 dark:text-blue-400 flex-shrink-0" width={16} height={16} />
                          )}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      {isLaunchpad ? (
                        <>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {isSelected ? 'Selected' : 'Click to add'}
                          </span>
                          <span className={`text-sm font-bold ${
                            isSelected
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            +${feature.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ Included in package
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center mt-8 space-y-3"
            >
              {selectedPackage === 'launchpad' && selectedFeatures.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    View your estimate in the package summary above
                  </p>
                </div>
              )}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  💡 <strong>Professional & Enterprise packages</strong> include most of these features at no additional cost!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
