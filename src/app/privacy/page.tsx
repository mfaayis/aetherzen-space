import { Metadata } from "next";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NextStep Career Guidance",
  description: "Learn how NextStep collects, uses, and protects your data.",
};

const LAST_UPDATED = "June 2026";

function Section({ id, title, icon: Icon, children }: { id: string; title: string; icon?: any; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-32">
      <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
        {Icon && <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400"><Icon size={20}/></span>}
        {title}
      </h2>
      <div className="space-y-4 text-neutral-300 font-sans leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Table of Contents - Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 glass-panel p-6 rounded-3xl border border-white/10 hidden md:block">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Contents</h3>
            <nav className="space-y-3 font-sans text-sm">
              <a href="#information-collection" className="block text-neutral-400 hover:text-white transition-colors">Information Collection</a>
              <a href="#how-we-use" className="block text-neutral-400 hover:text-white transition-colors">How We Use Data</a>
              <a href="#third-party" className="block text-neutral-400 hover:text-white transition-colors">Third-Party Services</a>
              <a href="#data-security" className="block text-neutral-400 hover:text-white transition-colors">Data Security</a>
              <a href="#your-rights" className="block text-neutral-400 hover:text-white transition-colors">Your Rights</a>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tighter">
              Privacy Policy
            </h1>
            <p className="text-neutral-400 font-sans">
              Last Updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="prose prose-invert prose-p:text-neutral-300 prose-a:text-blue-400 max-w-none font-sans">
            <p className="text-lg mb-12 text-neutral-300 leading-relaxed">
              At NextStep, we are committed to protecting your privacy and ensuring you have a secure experience while using our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <Section id="information-collection" title="1. Information We Collect" icon={Database}>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and age, that you voluntarily give to us when you register for an account or interact with our AI counselor.</li>
                <li><strong>Assessment Data:</strong> Answers, preferences, and results derived from any career or personality assessments you take on our platform.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              </ul>
            </Section>

            <Section id="how-we-use" title="2. How We Use Your Information" icon={Eye}>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li>Generate a personalized profile and career roadmap.</li>
                <li>Operate the AI Counseling feature effectively and provide relevant contextual advice.</li>
                <li>Improve our website design and functionality based on usage patterns.</li>
                <li>Respond to customer service requests and provide support.</li>
              </ul>
            </Section>

            <Section id="third-party" title="3. Third-Party Services" icon={Shield}>
              <p>We may share your information with third parties that perform services for us or on our behalf. Notably:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li><strong>Google Gemini AI:</strong> Our AI Counselor feature is powered by the Google Gemini API. When you chat with the counselor, your chat messages are sent to Google's servers to generate a response. Please avoid sharing highly sensitive personal identifying information in the chat.</li>
                <li><strong>Analytics:</strong> We may use third-party analytics providers (like Google Analytics or Vercel Analytics) to track and analyze web traffic.</li>
              </ul>
            </Section>

            <Section id="data-security" title="4. Data Security" icon={Lock}>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </Section>

            <Section id="your-rights" title="5. Your Rights & Contact" icon={Mail}>
              <p>
                Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your data.
              </p>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="p-6 mt-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
                <a href="mailto:privacy@nextstep.com" className="text-white font-bold hover:text-blue-400 transition-colors">
                  privacy@nextstep.com
                </a>
              </div>
            </Section>
          </div>
        </div>

      </div>
    </main>
  );
}
