import { Section } from "./Layout";
import { TOP_CONTRIBUTORS, CREATIVE_SPOTLIGHT, WEEKLY_CHALLENGE } from "../data";

export const CulturalPulse = () => {
    return (

        <Section className="py-40">

            <div className="max-w-7xl mx-auto px-8">

                <h2 className="text-5xl font-serif mb-20">
                    Cultural <span className="italic text-indigo-400">Pulse</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-12">

                    {/* Top Contributors */}

                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10">

                        <h3 className="text-xl font-serif mb-8">Top Contributors</h3>

                        <div className="flex flex-col gap-6">

                            {TOP_CONTRIBUTORS.map((c, i) => (

                                <div key={i} className="flex items-center gap-4">

                                    <img
                                        src={c.image}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>

                                        <p className="text-white text-sm">
                                            {c.name}
                                        </p>

                                        <p className="text-white/40 text-xs">
                                            {c.category}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* Creative Spotlight */}

                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10">

                        <h3 className="text-xl font-serif mb-8">
                            Creative Spotlight
                        </h3>

                        <div className="flex flex-col gap-8">

                            {CREATIVE_SPOTLIGHT.map((item, i) => (

                                <div key={i}>

                                    <img
                                        src={item.media}
                                        className="rounded-xl mb-4"
                                    />

                                    <p className="text-white text-sm">
                                        {item.title}
                                    </p>

                                    <p className="text-white/40 text-xs">
                                        {item.creator} – {item.club}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* Weekly Challenge */}

                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10">

                        <h3 className="text-xl font-serif mb-6">
                            Challenge of the Week
                        </h3>

                        <p className="text-white mb-4">
                            {WEEKLY_CHALLENGE.title}
                        </p>

                        <p className="text-white/40 text-sm mb-6">
                            {WEEKLY_CHALLENGE.description}
                        </p>

                        <span className="text-indigo-400 text-xs">
                            Deadline: {WEEKLY_CHALLENGE.deadline}
                        </span>

                    </div>

                </div>

            </div>

        </Section>

    );
};