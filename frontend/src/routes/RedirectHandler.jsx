import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Log } from "logging-middleware";

export default function RedirectHandler({ urls, updateClick }) {
  const { shortcode } = useParams();

  useEffect(() => {
    const found = urls.find((u) => u.shortcode === shortcode);
    if (!found) {
      alert("Invalid shortcode.");
      Log("frontend", "error", "page", `Shortcode ${shortcode} not found.`);
      return;
    }

    const now = new Date();
    if (now > new Date(found.expiry)) {
      alert("Link expired.");
      Log("frontend", "warn", "page", `Expired link accessed: ${shortcode}`);
      return;
    }

    const click = {
      timestamp: now.toISOString(),
      referrer: document.referrer || "direct",
      location: "MockLocation", // Replace with real IP logic if needed
    };

    updateClick(shortcode, click);
    Log("frontend", "info", "page", `Redirecting ${shortcode} to ${found.longUrl}`);

    window.location.href = found.longUrl;
  }, [shortcode, urls, updateClick]);

  return <p>Redirecting...</p>;
}
