"use client";

import { useEffect, useState } from "react";
import API from "@/app/lib/axios";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [portfolios, setPortfolios] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        githubUrl: "",
        liveUrl: "",
        techStack: "",
        portfolioId: "",
    });

    useEffect(() => {
        fetchProjects();
        fetchPortfolios();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await API.get("/projects");
            setProjects(res.data);
        } catch (error) { console.log(error); }
    };

    const fetchPortfolios = async () => {
        try {
            const res = await API.get("/portfolios");
            setPortfolios(res.data);
        } catch (error) { console.log(error); }
    };

    const createProject = async () => {
        try {
            await API.post("/projects", {
                ...formData,
                techStack: formData.techStack.split(",").map((item) => item.trim()),
            });
            setFormData({ title: "", description: "", githubUrl: "", liveUrl: "", techStack: "", portfolioId: "" });
            fetchProjects();
        } catch (error) { console.log(error); }
    };

    const deleteProject = async (id: string) => {
        try {
            await API.delete(`/project/${id}`);
            fetchProjects();
        } catch (error) { console.log(error); }
    };

    const inputClass = "w-full h-11 px-4 border border-[#e8e0d0] rounded-lg bg-[#f5f0e8]/50 text-sm font-light text-[#1a1814] outline-none focus:border-[#d6b98c] focus:bg-white transition-colors placeholder:text-[#1a1814]/30";
    const labelClass = "block text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/40 mb-1.5";

    return (
        <div className="p-10 bg-[#f5f0e8] min-h-screen">

            {/* Header */}
            <div className="mb-10">
                <h1 className="font-serif text-4xl font-normal text-[#1a1814]">
                    Manage <em className="italic text-[#b8925e]">Projects</em>
                </h1>
                <p className="text-sm text-[#1a1814]/40 font-light mt-1 tracking-wide">
                    Add and organise your portfolio projects
                </p>
            </div>

            {/* Create Project Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d0] p-8 mb-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#d6b98c]" />
                    <h2 className="text-[11px] font-medium tracking-widest uppercase text-[#1a1814]/50">
                        New Project
                    </h2>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <label className={labelClass}>Project Title</label>
                        <input
                            type="text"
                            placeholder="My Awesome App"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            placeholder="What does this project do?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full h-28 px-4 py-3 border border-[#e8e0d0] rounded-lg bg-[#f5f0e8]/50 text-sm font-light text-[#1a1814] outline-none focus:border-[#d6b98c] focus:bg-white transition-colors resize-none placeholder:text-[#1a1814]/30"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>GitHub URL</label>
                            <input
                                type="text"
                                placeholder="https://github.com/..."
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Live URL's</label>
                            <input
                                type="text"
                                placeholder="https://myproject.com"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            placeholder="React, TypeScript, Tailwind..."
                            value={formData.techStack}
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Portfolio</label>
                        <select
                            value={formData.portfolioId}
                            onChange={(e) => setFormData({ ...formData, portfolioId: e.target.value })}
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value="">Select a portfolio</option>
                            {portfolios.map((portfolio: any) => (
                                <option key={portfolio.id} value={portfolio.id}>
                                    {portfolio.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={createProject}
                        className="h-11 bg-[#1a1814] text-[#f5f0e8] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#2e2a25] transition-colors mt-2"
                    >
                        Create Project
                    </button>
                </div>
            </div>

            {/* Projects List */}
            <div className="grid gap-5">
                {projects.map((project: any) => (
                    <div
                        key={project.id}
                        className="bg-white border border-[#e8e0d0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="font-serif text-2xl font-normal text-[#1a1814]">
                                    {project.title}
                                </h2>
                                <p className="text-[#1a1814]/50 mt-2 text-sm font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-5">
                            {project.techStack?.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-[#d6b98c]/40 text-[#b8925e] bg-[#d6b98c]/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-6 pt-5 border-t border-[#f5f0e8]">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-9 px-5 border border-[#1a1814]/20 text-[#1a1814] text-[11px] font-medium tracking-widest uppercase rounded-lg flex items-center hover:bg-[#f5f0e8] transition-colors"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-9 px-5 border border-[#1a1814]/20 text-[#1a1814] text-[11px] font-medium tracking-widest uppercase rounded-lg flex items-center hover:bg-[#f5f0e8] transition-colors"
                                >
                                    Live
                                </a>
                            )}
                            <button
                                onClick={() => deleteProject(project.id)}
                                className="h-9 px-5 bg-red-50 text-red-500 text-[11px] font-medium tracking-widest uppercase rounded-lg hover:bg-red-100 transition-colors ml-auto border border-red-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}