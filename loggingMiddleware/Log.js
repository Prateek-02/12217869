// logging-middleware/log.js
dotenv.config({ path: "./loggingMiddleware/.env" });
const BEARER_TOKEN = process.env.BEARER_TOKEN;

export const Log = async (stack, level, packageName, message) => {
    try {
        const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BEARER_TOKEN}`
            },
            body: JSON.stringify({
                stack,
                level,
                package: packageName,
                message
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(`Logging failed: ${res.status} ${data.message || ""}`);
        } else {
            console.log(`✅ Log sent: ${message}`);
        }
    } catch (error) {
        console.error(`Logging failed: ${error.message}`);
    }
};
