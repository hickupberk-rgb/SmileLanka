import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import emailjs from "emailjs-com";

const SESSION_KEY = "smilelanka_admin_session";

const AdminAuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [adminExists, setAdminExists] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        if (parsedSession?.role === "admin") {
          navigate("/admin");
        }
      } catch (error) {
        localStorage.removeItem(SESSION_KEY);
      }
    }

    const checkAdminSetup = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/exists");
        const data = await response.json();
        setAdminExists(Boolean(data.exists));
        setMode(data.exists ? "login" : "register");
      } catch (error) {
        setAdminExists(true);
        setMode("login");
      }
    };

    checkAdminSetup();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "name" ? value.replace(/[0-9]/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "register") {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        setError("Please fill every field before creating the first admin account.");
        return;
      }

      if (!/^[A-Za-z]+(?:[ '\u002D][A-Za-z]+)*$/.test(form.name.trim())) {
        setError("Full name can contain only letters, spaces, apostrophes, and hyphens.");
        return;
      }

      if (form.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
        const response = await fetch("http://localhost:5000/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            password: form.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Registration failed");
          return;
        }

        if (data.pending) {
          try {
            await emailjs.send(
              "service_sthazi4",
              "template_cxf72kd",
              {
                to_email: "shewanthag@gmail.com",
                super_admin_email: "shewanthag@gmail.com",
                admin_name: form.name.trim(),
                admin_email: form.email.trim(),
                registered_at: new Date().toLocaleString(),
                approval_link: data.confirmationLink,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim() || "Not provided",
                registration_time: new Date().toLocaleString(),
                approve_link: data.confirmationLink,
                applicant_name: form.name.trim(),
                applicant_email: form.email.trim(),
                applicant_phone: form.phone.trim() || "Not provided",
                confirmation_link: data.confirmationLink,
                submitted_at: new Date().toLocaleString(),
              },
              "-jm6IVVik5T6iJptB",
            );
          } catch (emailError) {
            setError("The registration request was saved, but the approval email could not be sent. Check the EmailJS service and template settings.");
            return;
          }

          setMessage("Approval message sent to the super admin. You can sign in after the registration is confirmed.");
          setForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
          return;
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data.admin, token: data.token }));
        navigate("/admin");
      } catch (error) {
        setError("Unable to connect to server. Make sure the backend is running.");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data.admin, token: data.token }));
      navigate("/admin");
    } catch (error) {
      setError("Unable to connect to server. Make sure the backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.25),_transparent_35%),linear-gradient(135deg,_#09090b_0%,_#111827_100%)] px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black/70 shadow-2xl shadow-yellow-500/10 lg:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-amber-500/20 via-black to-black p-8 lg:p-10">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm text-amber-200">
              <ShieldCheck size={16} />
              Premium Admin Access
            </div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Welcome back to your Smile Lanka control center.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Manage bookings, track guest requests, and keep your tour operations moving smoothly from one responsive dashboard.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Secure admin access</p>
            <p className="mt-2">Only an existing admin account can access this dashboard.</p>
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{mode === "login" ? "Login" : "Register admin"}</p>
            <h2 className="text-2xl font-semibold text-white">Admin portal</h2>
          </div>

          {!adminExists && (
            <div className="mb-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
              No admin account exists yet. Create the first admin account to enter the dashboard.
            </div>
          )}

          {adminExists && (
            <button
              type="button"
              onClick={() => {
                setMode((currentMode) => (currentMode === "login" ? "register" : "login"));
                setError("");
                setMessage("");
              }}
              className="mb-5 text-sm text-amber-300 transition hover:text-amber-200"
            >
              {mode === "login" ? "New admin?" : "Back to admin login"}
            </button>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (/^[0-9]$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  inputMode="text"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 focus:border-amber-400"
                  placeholder="Alex Fernando"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-slate-300">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 focus:border-amber-400"
                placeholder="admin@example.com"
              />
            </div>

           

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 pr-12 text-white outline-none focus:border-amber-400"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="mb-2 block text-sm text-slate-300">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-amber-400"
                  placeholder="Repeat password"
                />
              </div>
            )}

            {message && <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{message}</p>}
            {error && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}

            <button type="submit" className="w-full rounded-2xl bg-amber-400 px-4 py-3 font-semibold text-black transition hover:bg-amber-300">
              {mode === "login" ? "Login to dashboard" : "Request admin registration"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-400">
            {mode === "login" ? "Only registered admins can sign in to this dashboard." : "The super admin must confirm this registration by email before access is enabled."}
          </p>

          <Link to="/" className="mt-5 inline-flex text-sm text-slate-400 transition hover:text-amber-300">
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
