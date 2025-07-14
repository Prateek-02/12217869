// Allowed values for logging
const allowedStacks = ["frontend", "backend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
const allowedPackages = [
  // Frontend
  "api", "component", "hook", "page", "state", "style",
  // Backend
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  // Both
  "auth", "config", "middleware", "utils"
];

// Endpoint to send logs to
const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

/**
 * Send a log event to the evaluation server.
 *
 * @param {string} stack   - "frontend" or "backend"
 * @param {string} level   - "debug", "info", "warn", "error", or "fatal"
 * @param {string} pkg     - Package name (see allowedPackages)
 * @param {string} message - A clear, descriptive message
 */
export async function Log(stack, level, pkg, message) {
  // Validate stack
  if (!allowedStacks.includes(stack)) {
    throw new Error(
      `Oops! "${stack}" is not a valid stack. Please use one of: ${allowedStacks.join(", ")}.`
    );
  }

  // Validate log level
  if (!allowedLevels.includes(level)) {
    throw new Error(
      `Hmm, "${level}" isn't a recognized log level. Allowed levels: ${allowedLevels.join(", ")}.`
    );
  }

  // Validate package
  if (!allowedPackages.includes(pkg)) {
    throw new Error(
      `Package "${pkg}" is not allowed. Please use one of: ${allowedPackages.join(", ")}.`
    );
  }

  // Validate message
  if (typeof message !== "string" || message.trim() === "") {
    throw new Error("Please provide a non-empty log message.");
  }

  // Prepare the log payload
  const payload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    const response = await fetch(LOGGING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add this line if you have a token
        "Authorization": `Bearer ${BEARER_TOKEN}` 
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Logging failed, but don't crash the app
      console.warn("Logging failed:", response.status, response.statusText);
    } 
    else {
      // const data = await response.json();
      const data = await response.json();
      console.log("Log sent successfully:", payload);
    }
  } 
  catch (error) {
    console.error("Failed to send log:", error);
  }
}