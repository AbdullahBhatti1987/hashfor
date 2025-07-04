"use client";
import React, { useState } from "react";
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiHelpCircle, 
  FiMail, 
  FiUser, 
  FiSearch,
  FiShield 
} from "react-icons/fi";
import { HiOutlineCurrencyDollar, HiOutlineCube } from "react-icons/hi";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      name: "Account",
      icon: <FiUser className="text-[var(--themeColor)] mr-2" />,
    },
    {
      name: "Packages",
      icon: <HiOutlineCube className="text-[var(--themeColor)] mr-2" />,
    },
    {
      name: "Payments",
      icon: <HiOutlineCurrencyDollar className="text-[var(--themeColor)] mr-2" />,
    },
    {
      name: "Security",
      icon: <FiShield className="text-[var(--themeColor)] mr-2" />,
    },
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button at the top right corner of the page. Fill in your details including email, password, and personal information. After verification, your account will be ready to use.",
      category: "Account",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard), bank transfers, and popular cryptocurrencies like Bitcoin and Ethereum.",
      category: "Payments",
    },
    {
      question: "How do investment packages work?",
      answer: "Our investment packages allow you to invest a specific amount for a fixed period. Each package offers different daily returns based on the amount invested and the package type. Returns are credited to your account daily.",
      category: "Packages",
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, we employ bank-level security measures including SSL encryption, two-factor authentication, and cold storage for cryptocurrencies to ensure your funds and data are protected.",
      category: "Security",
    },
    {
      question: "How can I withdraw my earnings?",
      answer: "You can withdraw your earnings by navigating to the 'Withdraw' section in your dashboard. Select your preferred withdrawal method, enter the amount, and submit your request. Processing typically takes 1-3 business days.",
      category: "Payments",
    },
    {
      question: "What happens when my package expires?",
      answer: "When your investment package expires, your initial investment is returned to your account balance. You can then withdraw it or reinvest in a new package.",
      category: "Packages",
    },
    {
      question: "How do I enable two-factor authentication?",
      answer: "Go to your Profile > Security settings and click 'Enable' on the Two-Factor Authentication option. Follow the instructions to set it up using an authenticator app like Google Authenticator.",
      category: "Security",
    },
    {
      question: "Can I change my account email?",
      answer: "Yes, you can change your account email in the Profile settings. Note that you'll need to verify the new email address for security purposes.",
      category: "Account",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-[#272727] rounded-full px-4 py-2 mb-4 border border-white/10">
            <FiHelpCircle className="text-[var(--themeColor)] mr-2" size={20} />
            <span className="font-medium text-[var(--themeColor)]">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our investment platform, packages, payments, and account management.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full bg-[#272727] border border-white/10 rounded-xl py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] focus:border-transparent"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all ${selectedCategory === "All" ? "bg-[var(--themeColor)] text-black" : "bg-[#272727] hover:bg-[#333333]"}`}
            >
              All Questions
            </button>
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all ${selectedCategory === category.name ? "bg-[var(--themeColor)] text-black" : "bg-[#272727] hover:bg-[#333333]"}`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#272727] rounded-xl border border-white/10 overflow-hidden transition-all duration-300"
            >
              <button
                className={`w-full flex justify-between items-center p-5 text-left focus:outline-none ${activeIndex === index ? 'bg-[#333333]' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="font-medium text-lg">{faq.question}</h3>
                {activeIndex === index ? (
                  <FiChevronUp className="text-[var(--themeColor)]" size={20} />
                ) : (
                  <FiChevronDown className="text-[var(--themeColor)]" size={20} />
                )}
              </button>
              <div
                className={`px-5 pb-5 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-300">{faq.answer}</p>
                <div className="mt-3 text-xs text-gray-500 flex items-center">
                  <span className="bg-[#1a1a1a] px-2 py-1 rounded-md">{faq.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#272727] to-[#1a1a1a] rounded-2xl border border-white/10 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <FiMail className="mx-auto text-[var(--themeColor)] mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-gray-400 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you.
            </p>
            <button className="bg-[var(--themeColor)] hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}