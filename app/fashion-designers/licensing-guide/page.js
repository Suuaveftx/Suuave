'use client';

import Link from 'next/link';

export default function LicensingGuidePage() {
    return (
        <div className="py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                {/* Main heading */}
                <h1 className="text-[#3A98BB] font-black text-[17px] md:text-[19px] uppercase tracking-wide mb-4">
                    The Suuave Guide to Rights &amp; Usage of Designs
                </h1>

                <p className="text-[13px] text-gray-700 leading-relaxed mb-10">
                    At Suuave, we treat digital artistry with the same prestige as physical couture. Our marketplace is built on
                    the principle that creative intellectual property is a valuable asset that deserves clear protection and fair
                    compensation. To ensure a seamless partnership between Artists and Brands (or Buyers), we&apos;ve distilled our
                    licensing into two straightforward paths. Whether you are building a recurring collection or handing over the
                    keys to a one-of-a-kind masterpiece, here is how we protect your work and your rights.
                </p>

                {/* Section 1 */}
                <section className="mb-10">
                    <h2 className="text-[#3A98BB] font-bold text-[15px] md:text-[17px] uppercase mb-2">
                        1. The Standard License (Non-Exclusive)
                    </h2>
                    <p className="text-[13px] text-gray-600 italic mb-4">
                        Designed for versatile growth. Artists build a library of recurring income; Brands (or Buyers) access
                        high-quality design at an accessible price point.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">For the Artist:</span> You keep full ownership and copyright of your work.
                                This design is available for unlimited licensing to our community of Brands (or Buyers). You have total
                                control to withdraw the design from Suuave at any time, without affecting the rights of those who have
                                already licensed it.
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">For the Brand (or Buyer):</span> You receive a perpetual right to use this
                                design for your products and marketing. Because this is a shared license, other Brands (or Buyers) may
                                also purchase and use this design. You cannot resell the digital file itself.
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">The Bottom Line:</span> Artists allow Brands (or Buyers) &apos;rent&apos; the right
                                to use their art, but they retain the full ownership and copyright.
                            </p>
                        </li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="mb-10">
                    <h2 className="text-[#3A98BB] font-bold text-[15px] md:text-[17px] uppercase mb-2">
                        2. The Exclusive License (The &quot;Buy-Out&quot;)
                    </h2>
                    <p className="text-[13px] text-gray-600 italic mb-4">
                        Designed for total brand identity. Artists receive a premium payout; Brands (or Buyers) gain 100%
                        undisputed ownership and market exclusivity.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">For the Artist:</span> You are selling the &apos;Master Rights&apos;. In exchange for
                                a premium price, you transfer all ownership and copyright to the Buyer. You can no longer use this design
                                for commercial work, but you keep the right to show it off in your professional portfolio, social media
                                or resume. You just have to mention it was &apos;Sold to [Brand or Buyer Name].&apos;
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">For the Brand (or Buyer):</span> You become the sole owner of the design.
                                Suuave immediately retires or takes down the design from the marketplace, ensuring no other Brand (or
                                Buyer) can ever purchase it. It is yours to use, modify, and trademark as you see fit.
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">The Bottom Line:</span> Artists sell their &apos;Golden Goose.&apos; They get a much
                                bigger paycheck after delivery, and the Brands (or Buyers) gets unique design that no one else in the
                                world will have.
                            </p>
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className="mb-10">
                    <h2 className="text-[#3A98BB] font-bold text-[15px] md:text-[17px] uppercase mb-2">
                        3. The Suuave Promise (Payments &amp; Escrow)
                    </h2>

                    <ul className="space-y-3">
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">Security:</span> To protect both parties, Suuave holds all funds in a
                                secure Escrow account.
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">Verification:</span> We ensure the Buyer receives their high-resolution
                                files and the Artist receives their payment (minus our platform fee) the moment the transaction is
                                confirmed.
                            </p>
                        </li>
                        <li className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                            <p>
                                <span className="font-bold">Support:</span> If a dispute arises, Suuave acts as the neutral mediator
                                to protect the integrity of the creative exchange.
                            </p>
                        </li>
                    </ul>
                </section>

                {/* Note */}
                <p className="text-[12px] text-gray-500 border-t border-gray-100 pt-6 leading-relaxed">
                    <span className="font-semibold">Note:</span> This guide is a summary of our marketplace rules. For the full
                    legal definitions, please refer to the{' '}
                    <Link href="#" className="text-[#3A98BB] font-semibold hover:underline">
                        Master Licensing Terms
                    </Link>.
                </p>
            </div>
        </div>
    );
}
