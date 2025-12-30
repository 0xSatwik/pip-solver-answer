import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy | Pips Answer",
    description: "Privacy Policy for Pips Answer - Learn how we protect your data and privacy.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-gray-300">Last updated: December 2025</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Pips Answer, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We may collect the following types of information:</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span><strong>Device Information:</strong> Browser type, device type, and operating system for optimization purposes.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span><strong>Cookies:</strong> Small data files to improve your browsing experience.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We use the collected information to:</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>Provide and maintain our puzzle solution service</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>Improve user experience and website functionality</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>Analyze usage patterns to enhance our content</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this privacy policy, please contact us at{' '}
                            <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">our contact page</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
