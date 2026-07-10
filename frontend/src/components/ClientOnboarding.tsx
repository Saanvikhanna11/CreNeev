import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";

type Step = "contact" | "business" | "plan" | "details" | "review" | "success";

const steps: { id: Step; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "business", label: "Business" },
  { id: "plan", label: "Plan" },
  { id: "details", label: "Details" },
];

const initialData = {
  name: "",
  email: "",
  phone: "",
  business: "",
  industry: "",
  otherIndustry: "",
  package: "Start",
  timeline: "",
  details: "",
};

export const ClientOnboarding: React.FC = () => {
  const [step, setStep] = useState<Step>("contact");
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const [welcomeBack, setWelcomeBack] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("creneev-onboarding");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData({ ...initialData, ...parsed.data });
        setStep(parsed.step || "contact");
        setWelcomeBack(true);
      } catch {
        localStorage.removeItem("creneev-onboarding");
      }
    }
  }, []);

  useEffect(() => {
    if (step === "success") return;
    localStorage.setItem("creneev-onboarding", JSON.stringify({ data, step }));
  }, [data, step]);

  const startOver = () => {
    localStorage.removeItem("creneev-onboarding");
    setData(initialData);
    setStep("contact");
    setError("");
    setWelcomeBack(false);
  };

  const selectedServices = useMemo(() => {
    if (data.package === "Elevate")
      return ["Full website", "Animations", "SEO", "Dashboard"];
    if (data.package === "Personalise")
      return ["Custom scope", "Selected add-ons"];
    return ["Static website", "WhatsApp", "Google Maps"];
  }, [data.package]);

  const validate = () => {
    if (step === "contact" && (!data.name || !data.email || !data.phone))
      return "Please complete the required contact details.";
    if (
      step === "business" &&
      (!data.business ||
        !data.industry ||
        (data.industry === "Other" && !data.otherIndustry))
    )
      return "Please complete the required business details.";
    if (step === "plan" && (!data.package || !data.timeline))
      return "Please choose a package and timeline.";
    if (step === "details" && !data.details)
      return "Please tell us a little about your project.";
    return "";
  };

  const next = () => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    if (step === "contact") setStep("business");
    else if (step === "business") setStep("plan");
    else if (step === "plan") setStep("details");
    else if (step === "details") setStep("review");
  };

  const back = () => {
    setError("");
    if (step === "business") setStep("contact");
    else if (step === "plan") setStep("business");
    else if (step === "details") setStep("plan");
    else if (step === "review") setStep("details");
  };

  const submit = async () => {
    try {
      setError("");
      setIsSubmitting(true);

      const estimatedBudget =
        data.package === "Elevate"
          ? "₹12,000 onwards"
          : data.package === "Personalise"
            ? "₹25,000 onwards"
            : "₹6,000 onwards";

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            businessName: data.business,
            industry:
              data.industry === "Other" ? data.otherIndustry : data.industry,
            package: data.package.toUpperCase(),
            timeline: data.timeline,
            projectDetails: data.details,
            selectedServices,
            estimatedBudget,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your project enquiry.",
        );
      }

      localStorage.removeItem("creneev-onboarding");
      setStep("success");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadSummary = () => {
    const doc = new jsPDF();
    const lines = [
      "CreNeev Project Summary",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Business: ${data.business}`,
      `Industry: ${data.industry === "Other" ? data.otherIndustry : data.industry}`,
      `Package: ${data.package}`,
      `Timeline: ${data.timeline}`,
      `Estimated Investment: ${data.package === "Elevate" ? "₹12,000 onwards" : data.package === "Personalise" ? "₹25,000 onwards" : "₹6,000 onwards"}`,
      "",
      "Selected Services:",
      ...selectedServices.map((service) => `- ${service}`),
      "",
      "Project Details:",
      data.details || "-",
    ];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(lines[0], 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(lines.slice(1), 20, 34, { maxWidth: 170, lineHeightFactor: 1.45 });
    doc.save(`creneev-project-summary-${data.name || "client"}.pdf`);
  };

  if (step === "success") {
    return (
      <section id="contact-form" className="px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-8 md:p-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
            Request received
          </p>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-[1.08] tracking-[-0.02em]">
            Your Journey Begins Here.
          </h2>
          <p className="mt-5 text-[var(--text-muted)] font-body max-w-xl mx-auto">
            Thank you for choosing CreNeev. We've received your project details
            and will contact you within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={downloadSummary}
              className="rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-body"
            >
              Download Project Summary
            </button>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-3 text-sm font-body font-semibold text-white"
            >
              Chat With Us on WhatsApp
            </a>
            <a
              href="/"
              className="rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-body"
            >
              Return to Homepage
            </a>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 md:p-8">
          {welcomeBack && (
            <div className="mb-6 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-3">
              <span>Welcome back! We've restored your progress.</span>
              <span className="flex gap-3">
                <button
                  onClick={() => setWelcomeBack(false)}
                  className="text-[var(--gradient-start)]"
                >
                  Continue Journey
                </button>
                <button onClick={startOver} className="text-[var(--text)]">
                  Start Over
                </button>
              </span>
            </div>
          )}

          <div className="mb-8 flex gap-3 overflow-x-auto">
            {steps.map((item, i) => {
              const active = item.id === step;
              return (
                <div
                  key={item.id}
                  className={`min-w-fit rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${active ? "border-[var(--gradient-start)] text-[var(--gradient-start)]" : "border-[var(--border-color)] text-[var(--text-muted)]"}`}
                >
                  {i + 1}. {item.label}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
            >
              {step === "contact" && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
                    1. Contact
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl mt-3">
                    How should we reach you?
                  </h3>
                  <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Your name *"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                    <input
                      placeholder="Email address *"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                    <input
                      placeholder="Phone number *"
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                  </div>
                </div>
              )}

              {step === "business" && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
                    2. Business
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl mt-3">
                    What are we building for?
                  </h3>
                  <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Business name *"
                      value={data.business}
                      onChange={(e) =>
                        setData({ ...data, business: e.target.value })
                      }
                      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                    <select
                      value={data.industry}
                      onChange={(e) =>
                        setData({ ...data, industry: e.target.value })
                      }
                      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                    >
                      <option value="">Select industry *</option>
                      {[
                        "Restaurant",
                        "Clinic",
                        "Salon",
                        "Gym",
                        "Boutique",
                        "Bakery",
                        "Real Estate",
                        "Other",
                      ].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    {data.industry === "Other" && (
                      <input
                        placeholder="Type your business type *"
                        value={data.otherIndustry}
                        onChange={(e) =>
                          setData({ ...data, otherIndustry: e.target.value })
                        }
                        className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                      />
                    )}
                  </div>
                </div>
              )}

              {step === "plan" && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
                    3. Plan
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl mt-3">
                    Choose your starting point.
                  </h3>
                  <div className="mt-8 grid md:grid-cols-3 gap-4">
                    {["Start", "Elevate", "Personalise"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setData({ ...data, package: option })}
                        className={`rounded-2xl border p-5 text-left ${data.package === option ? "border-[var(--gradient-start)] bg-[var(--surface)]" : "border-[var(--border-color)]"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <select
                    value={data.timeline}
                    onChange={(e) =>
                      setData({ ...data, timeline: e.target.value })
                    }
                    className="mt-4 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                  >
                    <option value="">Preferred timeline *</option>
                    <option>48-72 hours</option>
                    <option>Within 10 days</option>
                    <option>This month</option>
                  </select>
                </div>
              )}

              {step === "details" && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
                    4. Details
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl mt-3">
                    Tell us what matters most.
                  </h3>
                  <textarea
                    value={data.details}
                    onChange={(e) =>
                      setData({ ...data, details: e.target.value })
                    }
                    placeholder="Share goals, references, pages, features, timeline, or anything important. *"
                    rows={8}
                    className="mt-8 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm"
                  />
                </div>
              )}

              {step === "review" && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
                    Review
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl mt-3">
                    Ready to begin?
                  </h3>
                  <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(data).map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          {key}
                        </p>
                        <p className="mt-2 text-[var(--text)]">
                          {value || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p className="mt-6 text-sm text-[var(--gradient-start)]">{error}</p>
          )}

          <div className="mt-8 flex justify-between gap-3 border-t border-[var(--border-color)] pt-6">
            <button
              onClick={back}
              disabled={step === "contact"}
              className="rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-body disabled:opacity-40"
            >
              Back
            </button>
            {step === "review" ? (
              <button
                onClick={submit}
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-6 py-3 text-sm font-body font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Start Your Journey"}
              </button>
            ) : step === "details" ? (
              <button
                onClick={next}
                className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]"
              >
                Review
              </button>
            ) : (
              <button
                onClick={next}
                className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]"
              >
                Continue
              </button>
            )}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 h-fit sticky top-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">
            Your Journey
          </p>
          <div className="mt-5 space-y-4 text-sm font-body">
            <p>
              <span className="text-[var(--text-muted)]">Package:</span>{" "}
              {data.package}
            </p>
            <p>
              <span className="text-[var(--text-muted)]">Industry:</span>{" "}
              {data.industry === "Other"
                ? data.otherIndustry || "Other"
                : data.industry || "Not selected"}
            </p>
            <p>
              <span className="text-[var(--text-muted)]">Timeline:</span>{" "}
              {data.timeline || "Not selected"}
            </p>
            <div>
              <p className="text-[var(--text-muted)] mb-2">Selected services</p>
              <ul className="space-y-1">
                {selectedServices.map((service) => (
                  <li key={service}>- {service}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
