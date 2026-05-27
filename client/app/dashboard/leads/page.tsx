"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import API from "@/app/lib/axios";

interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  notes?: string;
  status?: string;
}

type LeadFormData = Omit<Lead, "id" | "status">;

const leadFields: Array<{
  name: keyof LeadFormData;
  placeholder: string;
  type: string;
  required?: boolean;
}> = [
  { name: "name", placeholder: "Full Name", type: "text", required: true },
  { name: "phone", placeholder: "Phone Number", type: "tel" },
  { name: "email", placeholder: "Email Address", type: "email" },
  { name: "company", placeholder: "Company", type: "text" },
];

export default function LeadsPage() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: "",
  });

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await API.get<Lead[]>(
        statusFilter
          ? `/leads?status=${statusFilter}`
          : "/leads"
      );
      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveLead = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingLead) {
        await API.patch(
          `/leads/${editingLead.id}`,
          formData
        );
      } else {
        await API.post("/leads", formData);
      }
      await fetchLeads();
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        notes: ""
      });

      setEditingLead(null);
      setIsModalOpen(false);

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await API.patch(`/leads/${id}/status`, {
        status,
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const response = await API.get<Lead[]>(
          statusFilter ? `/leads?status=${statusFilter}` : "/leads"
        );
        setLeads(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    void loadLeads();
  }, [statusFilter]);

  return (
    <>
      {/* ── Page ── */}
      <div className="min-h-screen bg-[#f7f7f5] px-6 py-10 font-[system-ui]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Leads
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {leads.length} lead{leads.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Lead
          </button>
        </div>

       <div className="flex gap-2 mb-6">
  {["", "ENQUIRY", "IN_PROGRESS", "CLIENT", "CLOSED"].map(
    (status) => (
      <button
        key={status}
        onClick={() => setStatusFilter(status)}
        className={`px-4 py-2 rounded-xl text-sm border ${
          statusFilter === status
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        {status || "ALL"}
      </button>
    )
  )}
</div>
        {/* Leads List */}
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mb-4 opacity-30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-lg font-medium">No leads yet</p>
              <p className="text-sm mt-1">Click &quot;Add Lead&quot; to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold uppercase shrink-0">
                    {lead.name?.charAt(0) ?? "?"}
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-base font-semibold text-gray-900 truncate">
                      {lead.name}
                    </h2>
                    {lead.company && (
                      <p className="text-xs text-gray-400 truncate">
                        {lead.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                  {lead.phone && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.19a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.28 16.92z" />
                      </svg>
                      <span>{lead.phone}</span>
                    </div>
                  )}
                  {lead.email && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="truncate">{lead.email}</span>
                    </div>
                  )}
                </div>

                {/* Status badge */}
                {/* Status + Actions */}
                <div className="flex items-center justify-between mt-4">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
                  >
                    <option value="ENQUIRY">ENQUIRY</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLIENT">CLIENT</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLead(lead);
                        setFormData({
                          name: lead.name || "",
                          phone: lead.phone || "",
                          email: lead.email || "",
                          company: lead.company || "",
                          notes: lead.notes || "",
                        });
                        setIsModalOpen(true);
                      }}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingLead ? "Edit Lead" : "New Lead"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={saveLead} className="px-6 py-5 space-y-4">
              {leadFields.map((field) => (
                <div key={field.name}>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                  />
                </div>
              ))}

              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
              />

              {/* Modal Footer */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  {isSubmitting
                    ? "Saving…"
                    : editingLead
                      ? "Update Lead"
                      : "Save Lead"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}