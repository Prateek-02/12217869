// logging-middleware/log.js

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmF0ZWVrcmFqZ3JkNzRAZ21haWwuY29tIiwiZXhwIjoxNzUyNDc3MDIyLCJpYXQiOjE3NTI0NzYxMjIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJmMTFmZTI1ZS01ODI1LTRjOGQtYjJhOS1hOWFlYWFhYmRjNWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwcmF0ZWVrIHJhaiIsInN1YiI6IjE2ZjJjYzllLTE4YTUtNGNlMC04NGU3LTBmY2NiM2ExYTYzMSJ9LCJlbWFpbCI6InByYXRlZWtyYWpncmQ3NEBnbWFpbC5jb20iLCJuYW1lIjoicHJhdGVlayByYWoiLCJyb2xsTm8iOiIxMjIxNzg2OSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjE2ZjJjYzllLTE4YTUtNGNlMC04NGU3LTBmY2NiM2ExYTYzMSIsImNsaWVudFNlY3JldCI6IkFYUlB2TU1OWW1LVUd4UHkifQ.2IdcmQQKKY4LmzCHJrHT3-aZKaccluj9QJZqVSq7-ig"; // Replace with your actual token

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
