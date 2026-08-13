import React from "react";
import { Link } from "react-router-dom";

const AuthLanding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white px-6">
      <div className="max-w-3xl w-full grid gap-6 md:grid-cols-2">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-2xl font-semibold">Continue as a Traveler</h2>
          <p className="mt-2 text-sm text-slate-300">Login or register to manage bookings, wishlist and profile.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/account" className="inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-3 font-semibold text-slate-950">User Login / Register</Link>
            <a href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm text-slate-300">Continue as Guest</a>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
          <h2 className="text-2xl font-semibold">Admin Portal</h2>
          <p className="mt-2 text-sm text-slate-300">Admins can sign in or request registration to access the dashboard.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/admin/auth" className="inline-flex items-center justify-center rounded-full bg-transparent border border-amber-400 px-4 py-3 font-semibold text-amber-300">Admin Login / Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
