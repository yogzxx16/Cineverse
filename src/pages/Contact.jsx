import { useState } from 'react';
import { Mail, Github, Twitter, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Save to local storage
    const messages = JSON.parse(localStorage.getItem('cineverse_messages') || '[]');
    messages.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem('cineverse_messages', JSON.stringify(messages));
    
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    { q: "Is CineVerse completely free to use?", a: "Yes! Creating a profile, writing reviews, and curating your watchlist is 100% free." },
    { q: "How do I request a missing movie?", a: "We pull directly from the TMDB database. If it's missing there, it won't appear here!" },
    { q: "Can I share my watchlist with friends?", a: "Currently, watchlists are stored locally on your device. Cloud syncing is coming in a future update." },
    { q: "How are the trending movies determined?", a: "We use the TMDB API to fetch globally trending movies updated on a daily basis." }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Contact <span className="text-primary">Us</span></h1>
        <p className="text-gray-400 text-lg">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-dark-card p-6 md:p-8 rounded-2xl border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted && (
              <div className="bg-green-500/20 text-green-400 p-4 rounded-lg flex items-center gap-2 mb-6 border border-green-500/20">
                <CheckCircle2 className="w-5 h-5" />
                <p>Thanks! We'll get back to you soon.</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option>General Inquiry</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 px-6 py-3 rounded-xl font-bold transition-colors mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info & FAQs */}
        <div className="flex flex-col">
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-primary transition-colors rounded-full border border-white/10">
                <Github className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary transition-colors rounded-full border border-white/10">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary transition-colors rounded-full border border-white/10">
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-dark-card border border-white/5 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between font-medium text-left focus:outline-none"
                  >
                    {faq.q}
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
