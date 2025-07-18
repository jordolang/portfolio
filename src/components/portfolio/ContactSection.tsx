"use client";

import emailjs from '@emailjs/browser';
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AnalyticsEvents, identifyUser, trackEvent } from '../../lib/analytics';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation Checks
    if (!formData.name.trim()) {
        alert('Please enter your name.');
        return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!formData.message.trim()) {
        alert('Please enter a message.');
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'jordan@jlang.dev', // Your email
        },
        publicKey
      );

      console.log('Email sent successfully:', result);
      
      // Track successful form submission
      trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMITTED, { status: 'success' });
      
      // Identify user in PostHog after successful submission
      identifyUser(formData.email, formData.name, {
        message_preview: formData.message.substring(0, 100), // First 100 chars for context
        contact_method: 'contact_form',
        email_service_result: result.status,
      });
      
      setSubmitStatus('success');
      // Keep the name temporarily for the thank you message
      const submittedName = formData.name;
      setFormData({ name: "", email: "", message: "" });
      // Store the name for the success message
      setSubmittedName(submittedName);

    } catch (error) {
      console.error('Failed to send email:', error);
      console.error('EmailJS Configuration:', {
        serviceId,
        templateId,
        publicKey: publicKey.substring(0, 10) + '...',
      });
      console.error('Form data being sent:', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message.substring(0, 50) + '...',
        to_email: 'jordan@jlang.dev',
      });
      
      // Track form submission failure
      trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMITTED, { 
        status: 'error',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        form_data: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message_length: formData.message.length,
        }),
      });
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="max-w-4xl mx-auto">


        <SectionHeader
          heading="Let's Work Together"
          description="Ready to bring your ideas to life? I'm always excited to work on interesting projects and collaborate with amazing people. Let's create something extraordinary together."
          tagIcon='solar:chat-line-bold'
          tagText='Contact'
          centered={true}

        />

        {/* Contact Form */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  placeholder="Your full name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="solar:loading-outline" width={20} height={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:letter-outline" width={20} height={20} />
                    Send Message
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-4 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3">
                    <Icon icon="solar:check-circle-bold" width={24} height={24} />
                    <span className="font-semibold text-lg">Message sent successfully!</span>
                  </div>
                  <p className="text-green-600 dark:text-green-500 mb-4">
                    Thank you, <span className="font-medium">{submittedName}</span>! Your message has been delivered and I&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      onClick={() => {
                        setSubmitStatus('idle');
                        setSubmittedName('');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Icon icon="solar:letter-outline" width={18} height={18} />
                      Send Another Message
                    </motion.button>
                    <button
                      onClick={() => {
                        setSubmitStatus('idle');
                        setSubmittedName('');
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300"
                    >
                      <Icon icon="solar:close-circle-outline" width={18} height={18} />
                      Close
                    </button>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <Icon icon="solar:close-circle-bold" width={20} height={20} />
                    <span className="font-medium">Failed to send message</span>
                  </div>
                  <p className="text-red-600 text-left dark:text-red-500 text-sm mt-1">
                    Please try again or contact me directly at jordolang@gmail.com
                  </p>
                  {/* add a button to close the message */}
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="absolute top-1 right-1  text-red-500 rounded-md"
                  >
                    <Icon icon="solar:close-circle-bold" width={20} height={20} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">Or reach out directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="mailto:jordolang@gmail.com"
                onClick={() => trackEvent(AnalyticsEvents.SOCIAL_LINK_CLICKED, { platform: 'email', method: 'email_link' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Icon icon="solar:mailbox-bold-duotone" width={18} height={18} />
                Send Email
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
