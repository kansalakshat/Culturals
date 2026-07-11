import { Section } from "./Layout";
import { CULTURAL_FEED } from "../data";
import { motion } from "motion/react";

export const CulturalFeed = () => {

    return (

        <Section className="py-40">

            <div className="max-w-7xl mx-auto px-8">

                <h2 className="text-5xl font-serif mb-20">
                    Cultural <span className="italic text-indigo-400">Feed</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {CULTURAL_FEED.map((item) => (

                        <motion.div
                            key={item.id}
                            className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden"
                            whileHover={{ y: -8 }}
                        >

                            <img
                                src={item.image}
                                className="h-40 w-full object-cover"
                            />

                            <div className="p-6">

                                <p className="text-indigo-400 text-xs uppercase tracking-widest mb-2">
                                    {item.club}
                                </p>

                                <p className="text-white text-sm mb-4">
                                    {item.activity}
                                </p>

                                <span className="text-white/40 text-xs">
                                    {item.date}
                                </span>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </Section>

    );

};