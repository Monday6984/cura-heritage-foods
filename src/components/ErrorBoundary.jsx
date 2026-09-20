import React from 'react';

// Catches render errors so a bug shows a friendly page instead of a blank screen.
// Uses a plain <a> (full page load) so the app and this boundary start fresh.
export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#120904] px-6 text-center text-[#F9F6F0]">
        <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
          Something went wrong
        </span>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.4rem)] font-semibold">
          We hit an unexpected problem.
        </h1>
        <p className="mt-3 max-w-md font-body text-[15px] font-light text-[#e8dab8]">
          Please reload the page. If it keeps happening, you can still reach us on WhatsApp or by phone.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm"
        >
          Reload the site
        </a>
      </main>
    );
  }
}
