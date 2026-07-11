import { Section } from "./Layout";
import { ALL_EVENTS, CLUBS } from "../data";
import Calendar from "react-calendar";
import { useState } from "react";
import { motion } from "motion/react";

export const CulturalCalendar = () => {

    const [date, setDate] = useState(new Date());
    const [typeFilter, setTypeFilter] = useState("all");
    const [clubFilter, setClubFilter] = useState("all");

    const selectedDate = date.toDateString();

    const filteredEvents = ALL_EVENTS.filter((event) => {

        const matchesType =
            typeFilter === "all" || event.type === typeFilter;

        const matchesClub =
            clubFilter === "all" || event.clubId === clubFilter;

        const matchesDate =
            new Date(event.date).toDateString() === selectedDate;

        return matchesType && matchesClub && matchesDate;

    });


    return (

        <Section className="py-40">

            <div className="max-w-7xl mx-auto px-8">

                {/* TITLE */}

                <h2 className="text-5xl font-serif mb-16">
                    Cultural <span className="italic text-indigo-400">Calendar</span>
                </h2>


                {/* EVENT TYPE FILTER */}

                <div className="flex flex-wrap gap-4 mb-10">

                    {["all", "upcoming", "inter-iit", "meraz", "anveshan", "other"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setTypeFilter(f)}
                            className={`px-5 py-2 rounded-full text-xs uppercase border transition ${typeFilter === f
                                ? "bg-indigo-500 text-black border-indigo-500"
                                : "border-white/20 hover:border-indigo-400"
                                }`}
                        >
                            {f}
                        </button>
                    ))}

                </div>


                {/* CLUB FILTER */}

                <div className="flex flex-wrap gap-4 mb-20">

                    <button
                        onClick={() => setClubFilter("all")}
                        className={`px-5 py-2 rounded-full text-xs border transition ${clubFilter === "all"
                            ? "bg-indigo-500 text-black border-indigo-500"
                            : "border-white/20 hover:border-indigo-400"
                            }`}
                    >
                        All Clubs
                    </button>

                    {CLUBS.map((club) => (
                        <button
                            key={club.id}
                            onClick={() => setClubFilter(club.id)}
                            className={`px-5 py-2 rounded-full text-xs border transition ${clubFilter === club.id
                                ? "bg-indigo-500 text-black border-indigo-500"
                                : "border-white/20 hover:border-indigo-400"
                                }`}
                        >
                            {club.name}
                        </button>
                    ))}

                </div>


                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* CALENDAR */}

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}
                    >

                        <Calendar

                            onChange={(value: any) => setDate(value)}
                            value={date}

                            prevLabel="‹"
                            nextLabel="›"
                            prev2Label={null}
                            next2Label={null}

                            navigationLabel={({ date }) => {

                                const month = date.toLocaleString("default", { month: "long" });
                                const year = date.getFullYear();

                                return (
                                    <span className="text-xl font-serif tracking-wide">
                                        {month} <span className="text-indigo-400">{year}</span>
                                    </span>
                                );

                            }}

                            tileContent={({ date, view }) => {

                                if (view !== "month") return null;

                                const dayEvents = ALL_EVENTS.filter(
                                    event =>
                                        new Date(event.date).toDateString() ===
                                        date.toDateString()
                                );

                                if (dayEvents.length === 0) return null;

                                return (

                                    <div className="flex justify-center mt-1 gap-1">

                                        {dayEvents.slice(0, 3).map((event, i) => {

                                            const club = CLUBS.find(c => c.id === event.clubId);

                                            return (

                                                <span
                                                    key={i}
                                                    className="w-2.5 h-2.5 rounded-full"
                                                    style={{
                                                        background:
                                                            club?.theme.accent || "#6366f1"
                                                    }}
                                                />

                                            );

                                        })}

                                    </div>

                                );

                            }}

                        />

                    </motion.div>



                    {/* EVENT LIST */}

                    <div className="flex flex-col gap-6">

                        <h3 className="text-2xl font-serif">
                            Events on {date.toDateString()}
                        </h3>

                        <p className="text-indigo-300 text-sm">
                            {filteredEvents.length} event
                            {filteredEvents.length !== 1 && "s"} scheduled
                        </p>


                        {filteredEvents.length === 0 && (

                            <p className="text-white/40">
                                No cultural events scheduled.
                            </p>

                        )}


                        {filteredEvents.map((event) => {

                            const club = CLUBS.find(c => c.id === event.clubId);

                            return (

                                <motion.div
                                    key={event.id}
                                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex gap-6 backdrop-blur-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.04,
                                        borderColor: "rgba(99,102,241,0.6)",
                                        boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
                                    }}
                                >

                                    <img
                                        src={event.image}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />

                                    <div>

                                        <p
                                            className="text-xs uppercase mb-1"
                                            style={{ color: club?.theme.accent }}
                                        >
                                            {event.clubName}
                                        </p>

                                        <h4 className="font-serif text-lg">
                                            {event.title}
                                        </h4>

                                        <p className="text-white/40 text-sm">
                                            {event.description}
                                        </p>

                                    </div>

                                </motion.div>

                            );

                        })}

                    </div>

                </div>

            </div>

        </Section>

    );

};