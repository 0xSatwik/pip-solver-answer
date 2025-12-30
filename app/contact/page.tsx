import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | Pips Answer",
    description: "Get in touch with the Pips Answer team for questions, feedback, or support.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-emerald-100">We'd love to hear from you</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="How can we help you?" />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">📧</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">support@pipsanswer.com</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Response Time</h3>
                            <p className="text-gray-600">We typically respond within 24-48 hours</p>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">FAQ</h3>
                            <p className="text-gray-600 mb-4">Before reaching out, check if your question is answered in our puzzle explanations!</p>
                            <a href="/today" className="text-emerald-600 font-medium hover:text-emerald-700 transition">View Today's Puzzle →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
