import { Layout, Section } from "../components/Layout";
import { motion } from "motion/react";

import feedbackImg from "../assets/gallery/feedback.png";

export const Feedback = () => {

    return (

        <Layout>

            <Section className="py-28">

                <div className="max-w-4xl mx-auto px-8 text-center">

                    {/* Title */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-serif mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Feedback <span className="italic text-indigo-400">Form</span>
                    </motion.h1>


                    {/* Description */}
                    <motion.p
                        className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed mb-14"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Help us improve the cultural ecosystem of IIT Bhilai.
                        Share your thoughts about events, clubs, performances,
                        and suggestions for the Cultural Council.
                    </motion.p>


                    {/* Card */}
                    <motion.a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfH83lsdYrQUgff_rbmyn_RvHgTz0Ei1U79clkJRZeF_iBKYw/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        whileHover={{ scale: 1.02 }}
                    >

                        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[36px] overflow-hidden p-10 max-w-3xl mx-auto hover:border-indigo-400 transition-all duration-500 shadow-[0_0_60px_rgba(99,102,241,0.15)]">

                            {/* Google Form Label */}
                            <div className="flex items-center justify-center gap-3 mb-6">

                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Forms_2020_Logo.svg"
                                    className="w-8 h-8"
                                />

                                <span className="text-indigo-400 text-xs uppercase tracking-[0.4em]">
                                    Google Form
                                </span>

                            </div>


                            <h2 className="text-3xl md:text-4xl font-serif mb-4">
                                Share Your Feedback
                            </h2>


                            <p className="text-white/40 mb-8 max-w-xl mx-auto">
                                Tell us what you loved, what can be improved,
                                and what you want to see next in IIT Bhilai’s cultural scene.
                            </p>


                            <div className="inline-flex items-center gap-3 px-7 py-3 bg-indigo-500 text-black text-xs uppercase tracking-[0.3em] font-bold rounded-full group-hover:bg-white transition-all mb-10">

                                Open Google Form

                                <span className="group-hover:translate-x-2 transition-transform">
                                    →
                                </span>

                            </div>


                            {/* Image */}
                            <div className="flex justify-center">

                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]">

                                    <img
                                        src={feedbackImg}
                                        alt="Feedback preview"
                                        className="max-h-[260px] w-auto object-contain group-hover:scale-105 transition-all duration-700"
                                    />

                                </div>

                            </div>

                        </div>

                    </motion.a>

                </div>

            </Section>

        </Layout>

    );

};