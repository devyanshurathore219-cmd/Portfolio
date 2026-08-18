import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, MapPin, ChevronDown, Check } from 'lucide-react';

const phonePrefixes = [
  { code: 'US', prefix: '+1', flag: '🇺🇸' },
  { code: 'IN', prefix: '+91', flag: '🇮🇳' },
  { code: 'UK', prefix: '+44', flag: '🇬🇧' },
  { code: 'CA', prefix: '+1', flag: '🇨🇦' },
  { code: 'AU', prefix: '+61', flag: '🇦🇺' }
];

const serviceOptions = [
  'Website design',
  'Content creation',
  'UX design',
  'Strategy & consulting',
  'User research',
  'Other'
];

export default function ContactPage() {
  const [selectedPrefix, setSelectedPrefix] = useState(phonePrefixes[0]);
  const [isPrefixOpen, setIsPrefixOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, []);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      alert(`Thank you ${formData.firstName}! Your contact request has been sent successfully.`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setSelectedServices([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] relative text-[#111] overflow-x-hidden pt-32 pb-24 selection:bg-[#111] selection:text-white">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid-overlay z-0" />

      {/* Main Content Area */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Centered Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
          <h1 className="text-[42px] font-bold text-[#111] tracking-tight leading-tight mb-4">
            Contact our team
          </h1>
          <p className="text-[16px] text-[#6b7280] leading-relaxed max-w-[600px] mx-auto">
            Got any questions about the product or scaling on our platform? We're here to help. Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 fade-in-up delay-100">
            <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-sm p-2 sm:p-4 rounded-xl">
              
              {/* Row: First/Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="text-[13px] font-medium text-[#374151] mb-2">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="First name"
                    className="w-full bg-white border border-[#e5e7eb] rounded-[8px] p-[12px] text-[15px] text-[#111] placeholder:text-gray-400 focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] transition-shadow"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] font-medium text-[#374151] mb-2">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Last name"
                    className="w-full bg-white border border-[#e5e7eb] rounded-[8px] p-[12px] text-[15px] text-[#111] placeholder:text-gray-400 focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] transition-shadow"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col mb-6">
                <label className="text-[13px] font-medium text-[#374151] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="you@company.com"
                  className="w-full bg-white border border-[#e5e7eb] rounded-[8px] p-[12px] text-[15px] text-[#111] placeholder:text-gray-400 focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] transition-shadow"
                />
              </div>

              {/* Phone with prefix selection dropdown */}
              <div className="flex flex-col mb-6">
                <label className="text-[13px] font-medium text-[#374151] mb-2">Phone number</label>
                <div className="flex w-full bg-white border border-[#e5e7eb] rounded-[8px] relative focus-within:border-[#111] focus-within:ring-1 focus-within:ring-[#111] transition-shadow">
                  
                  {/* Custom Dropdown Trigger */}
                  <div 
                    onClick={() => setIsPrefixOpen(!isPrefixOpen)}
                    className="flex items-center px-3 border-r border-[#e5e7eb] bg-white text-[15px] text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors shrink-0 select-none"
                  >
                    <span className="mr-1">{selectedPrefix.flag}</span>
                    <span className="text-sm font-medium mr-1">{selectedPrefix.code}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Dropdown Menu */}
                  {isPrefixOpen && (
                    <div className="absolute top-[50px] left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 w-[120px]">
                      {phonePrefixes.map(prefix => (
                        <div 
                          key={prefix.code}
                          onClick={() => {
                            setSelectedPrefix(prefix);
                            setIsPrefixOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-[#111] hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <span>{prefix.flag}</span>
                          <span className="font-semibold">{prefix.code}</span>
                          <span className="text-gray-400 text-xs ml-auto">{prefix.prefix}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={`${selectedPrefix.prefix} (555) 000-0000`}
                    className="w-full border-none p-[12px] text-[15px] text-[#111] placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col mb-8">
                <label className="text-[13px] font-medium text-[#374151] mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Leave us a message..."
                  className="w-full bg-white border border-[#e5e7eb] rounded-[8px] p-[12px] text-[15px] text-[#111] placeholder:text-gray-400 focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111] resize-none transition-shadow"
                />
              </div>

              {/* Services Checkboxes */}
              <div className="mb-8">
                <span className="block text-[13px] font-medium text-[#374151] mb-4">How can we help?</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceOptions.map(option => {
                    const isSelected = selectedServices.includes(option);
                    return (
                      <div 
                        key={option}
                        onClick={() => handleServiceToggle(option)}
                        className="flex items-center gap-3 cursor-pointer select-none"
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#111] border-[#111]' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                        </div>
                        <span className="text-sm font-medium text-[#374151]">{option}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#111] hover:bg-gray-800 text-white py-3.5 rounded-[8px] text-[14px] font-semibold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>

            </form>
          </div>

          {/* Right Column: Support info card */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 justify-start pt-6 lg:pt-12 fade-in-up delay-200">
            
            {/* Box 1 */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-[#111] shrink-0 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-[16px] mb-1">Email me</h4>
                <p className="text-[14px] text-[#6b7280] mb-2">I am always open to new opportunities.</p>
                <a href="mailto:devyanshurathore219@gmail.com" className="text-[14px] font-semibold hover:underline">
                  devyanshurathore219@gmail.com
                </a>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-[#111] shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-[16px] mb-1">Call me</h4>
                <p className="text-[14px] text-[#6b7280] mb-2">Available for calls and discussions.</p>
                <a href="tel:+919870324454" className="text-[14px] font-semibold hover:underline">
                  +91 9870324454
                </a>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-[#111] shrink-0 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-[16px] mb-1">Location</h4>
                <p className="text-[14px] text-[#6b7280] mb-2">Based in India.</p>
                <p className="text-[14px] font-semibold leading-relaxed">
                  New Delhi, India
                </p>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
