import { Section } from "./Layout";
import { HALL_OF_FAME } from "../data";

// ✅ IMPORT IMAGES
import oldGenSec from "../assets/council/oldgensec.png";
import prevGenSec from "../assets/council/prevgensec.png";

export const HallOfFame = () => {

    return (

        <Section className="py-40">

            <div className="max-w-7xl mx-auto px-8">

                {/* TITLE */}
                <h2 className="text-5xl font-serif mb-20">
                    Cultural <span className="italic text-indigo-400">Hall of Fame</span>
                </h2>

                {HALL_OF_FAME.map((yearBlock, i) => (

                    <div key={i} className="mb-20">

                        {/* YEAR */}
                        <h3 className="text-3xl font-serif text-indigo-400 mb-10">
                            {yearBlock.year}
                        </h3>

                        {/* MEMBERS */}
                        <div className="grid md:grid-cols-3 gap-10">

                            {yearBlock.members
                                .filter(member => member.role === "General Secretary")
                                .map((member, j) => {

                                    const isGenSec = member.role === "General Secretary";

                                    return (
                                        <div
                                            key={j}
                                            className="bg-white/[0.02] border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-500"
                                        >

                                            {/* IMAGE */}
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4">
                                                <img
                                                    src={
                                                        isGenSec
                                                            ? (i === 0 ? prevGenSec : oldGenSec)
                                                            : (member.image || oldGenSec)
                                                    }
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* NAME */}
                                            <h4 className="text-2xl font-serif mb-2">
                                                {member.name}
                                            </h4>

                                            {/* ROLE */}
                                            <p className="text-indigo-400 text-xs mb-2 uppercase tracking-[0.2em]">
                                                {member.role}
                                            </p>

                                            {/* CLUB */}
                                            <p className="text-white/40 text-sm">
                                                {member.club}
                                            </p>

                                        </div>
                                    );
                                })}

                        </div>

                    </div>

                ))}

            </div>

        </Section>

    );

};