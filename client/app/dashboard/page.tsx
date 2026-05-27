"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../lib/axios";
import Link from "next/link";

export default function DashboardPage() {
    const [portfolios, setPortfolios] = useState([]);
    const [formData, setFormData] = useState({ title: "", slug: "", bio: "" });
    const router = useRouter();

    useEffect(() => { fetchPortfolios(); }, []);

    const fetchPortfolios = async () => {
        try {
            const res = await API.get("/portfolios");
            setPortfolios(res.data);
        } catch (error) { console.log(error); }
    };

    const createPortfolio = async () => {
        try {
            await API.post("/portfolios", formData);
            setFormData({ title: "", slug: "", bio: "" });
            fetchPortfolios();
        } catch (error) { console.log(error); }
    };

    return (
        <div className="p-10 bg-[#f5f0e8] min-h-screen">

            {/* Header */}
            <div className="mb-10">
                <h1 className="font-serif text-4xl font-normal text-[#1a1814]">
                    My <em className="italic text-[#b8925e]">Portfolios</em>
                </h1>
                <p className="text-sm text-[#1a1814]/40 font-light mt-1 tracking-wide">
                    Create and manage your portfolio collections
                </p>
            </div>

            {/* Create Portfolio Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d0] p-8 mb-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#d6b98c]" />
                    <h2 className="text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/50">
                        New Portfolio
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/40 mb-1.5">
                            Portfolio Title
                        </label>
                        <input
                            type="text"
                            placeholder="My Creative Work"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full h-11 px-4 border border-[#e8e0d0] rounded-lg bg-[#f5f0e8]/50 text-sm font-light text-[#1a1814] outline-none focus:border-[#d6b98c] focus:bg-white transition-colors placeholder:text-[#1a1814]/30"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/40 mb-1.5">
                            Slug
                        </label>
                        <input
                            type="text"
                            placeholder="my-creative-work"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full h-11 px-4 border border-[#e8e0d0] rounded-lg bg-[#f5f0e8]/50 text-sm font-light text-[#1a1814] outline-none focus:border-[#d6b98c] focus:bg-white transition-colors placeholder:text-[#1a1814]/30"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/40 mb-1.5">
                            Bio
                        </label>
                        <textarea
                            placeholder="A short description of your work..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full h-28 px-4 py-3 border border-[#e8e0d0] rounded-lg bg-[#f5f0e8]/50 text-sm font-light text-[#1a1814] outline-none focus:border-[#d6b98c] focus:bg-white transition-colors resize-none placeholder:text-[#1a1814]/30"
                        />
                    </div>

                    <button
                        onClick={createPortfolio}
                        className="h-11 bg-[#1a1814] text-[#f5f0e8] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#2e2a25] transition-colors mt-2"
                    >
                        Create Portfolio
                    </button>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map((portfolio: any) => (
                    <div
                        key={portfolio.id}
                        className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#d6b98c]" />
                            <span className="text-[10px] tracking-widest uppercase text-[#1a1814]/40 font-medium">
                                {portfolio.slug}
                            </span>
                        </div>

                        <h2 className="font-serif text-2xl font-normal text-[#1a1814]">
                            {portfolio.title}
                        </h2>

                        <p className="text-[#1a1814]/50 mt-3 text-sm font-light leading-relaxed line-clamp-3">
                            {portfolio.bio}
                        </p>

                        <div className="flex gap-3 mt-6 pt-5 border-t border-[#f5f0e8]">
                            <Link
                                href={`/dashboard/editor/${portfolio.id}`}
                                className="flex-1 h-9 bg-[#1a1814] text-[#f5f0e8] text-[11px] font-medium tracking-widest uppercase rounded-lg flex items-center justify-center hover:bg-[#2e2a25] transition-colors"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/${portfolio.slug}`}
                                className="flex-1 h-9 border border-[#1a1814]/20 text-[#1a1814] text-[11px] font-medium tracking-widest uppercase rounded-lg flex items-center justify-center hover:bg-[#f5f0e8] transition-colors"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}