"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import API from "@/app/lib/axios";

export default function PortfolioEditor({
    params,
}: {
    params: Promise<{ portfolioId: string }>;
}) {
    const { portfolioId } = use(params);
    const [portfolio, setPortfolio] = useState<any>(null);

    useEffect(() => { fetchPortfolio(); }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await API.get("/portfolios");
            const currentPortfolio = res.data.find((item: any) => item.id === portfolioId);
            setPortfolio(currentPortfolio);
        } catch (error) { console.log(error); }
    };

    const savePortfolio = async () => {
        try {
            await API.patch(`/portfolios/${portfolioId}`, {
                title: portfolio.title,
                bio: portfolio.bio,
                slug: portfolio.slug,
                theme: portfolio.theme,
            });
            alert("Portfolio updated!");
        } catch (error) { console.log(error); }
    };

    if (!portfolio) {
        return (
            <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#d6b98c] animate-pulse" />
                    <span className="text-sm text-[#1a1814]/40 font-light tracking-widest uppercase">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* LEFT — Editor */}
            <div className="bg-[#1a1814] p-10 flex flex-col">

                {/* Brand */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d6b98c]" />
                    <span className="text-[#d6b98c] text-xs tracking-widest uppercase font-light">
                        Portfolio Editor
                    </span>
                </div>

                <h1 className="font-serif text-3xl font-normal text-[#f5f0e8] mb-2">
                    Edit your{" "}
                    <em className="italic text-[#d6b98c]">portfolio</em>
                </h1>
                <p className="text-[#f5f0e8]/30 text-sm font-light mb-10">
                    Changes are reflected live in the preview
                </p>

                <div className="flex flex-col gap-5 flex-1">
                    <div>
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8]/30 mb-1.5">
                            Portfolio Title
                        </label>
                        <input
                            type="text"
                            value={portfolio.title}
                            onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                            className="w-full h-11 px-4 border border-white/10 rounded-lg bg-white/5 text-sm font-light text-[#f5f0e8] outline-none focus:border-[#d6b98c] focus:bg-white/10 transition-colors placeholder:text-white/20"
                            placeholder="Portfolio Title"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-[#f5f0e8]/30 mb-1.5">
                            Bio
                        </label>
                        <textarea
                            value={portfolio.bio || ""}
                            onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                            className="w-full h-40 px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-sm font-light text-[#f5f0e8] outline-none focus:border-[#d6b98c] focus:bg-white/10 transition-colors resize-none placeholder:text-white/20"
                            placeholder="Tell the world about your work..."
                        />
                    </div>

                    <select
                        value={portfolio.theme || "minimal"}
                        onChange={(e) =>
                            setPortfolio({
                                ...portfolio,
                                theme: e.target.value,
                            })
                        }
                        className="border p-3 rounded-xl"
                    >
                        <option value="minimal">
                            Minimal
                        </option>

                        <option value="cyberpunk">
                            Cyberpunk
                        </option>

                        <option value="glass">
                            Glass
                        </option>
                    </select>

                    <button
                        onClick={savePortfolio}
                        className="h-11 bg-[#d6b98c] text-[#1a1814] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#c9a87a] transition-colors mt-auto"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* RIGHT — Live Preview */}
            <div className="bg-[#f5f0e8] p-12 overflow-y-auto">
                <div className="max-w-xl mx-auto">

                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d6b98c]" />
                        <span className="text-[10px] tracking-widest uppercase text-[#1a1814]/30 font-medium">
                            Live Preview
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl font-normal text-[#1a1814] leading-tight">
                        {portfolio.title || "Portfolio Title"}
                    </h1>

                    <p className="text-[#1a1814]/50 text-base mt-6 leading-relaxed font-light">
                        {portfolio.bio || "Your bio will appear here..."}
                    </p>

                    <div className="mt-16">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="font-serif text-2xl font-normal text-[#1a1814]">
                                Projects
                            </h2>
                            <div className="flex-1 h-px bg-[#1a1814]/10" />
                        </div>

                        <div className="grid gap-5">
                            {portfolio.projects?.length > 0 ? (
                                portfolio.projects.map((project: any) => (
                                    <div
                                        key={project.id}
                                        className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-sm"
                                    >
                                        <h3 className="font-serif text-xl font-normal text-[#1a1814]">
                                            {project.title}
                                        </h3>
                                        <p className="text-[#1a1814]/50 mt-2 text-sm font-light leading-relaxed">
                                            {project.description}
                                        </p>

                                        {project.techStack?.length > 0 && (
                                            <div className="flex gap-2 flex-wrap mt-4">
                                                {project.techStack.map((tech: string) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide border border-[#d6b98c]/40 text-[#b8925e] bg-[#d6b98c]/10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="border border-dashed border-[#1a1814]/20 rounded-2xl p-8 text-center">
                                    <p className="text-[#1a1814]/30 text-sm font-light">
                                        No projects yet — add some from the Projects page
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}