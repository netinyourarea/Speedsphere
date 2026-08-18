import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The site itself is a self-contained vanilla HTML/CSS/JS build served from
// /public. The app root simply hands off to it.
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#11152f] px-6 text-center text-white">
      <p className="text-sm tracking-widest uppercase">
        Loading Speedsphere… <a className="underline" href="/">Continue</a>
      </p>
    </div>
  );
}
