# React URL Shortener with Logging Middleware

A user-friendly **React-based URL Shortener** application with **client-side routing, analytics, and custom logging middleware integration**, developed as part of the **Campus Hiring Evaluation**.

---

## 🚀 Features

✅ **Shorten up to 5 URLs concurrently** with:
- Original long URL
- Optional validity period (defaults to 30 minutes if not provided)
- Optional custom shortcode with uniqueness validation

✅ **Shortcode-based redirection** using React Router.

✅ **Statistics page** showing:
- All created short URLs with creation/expiry timestamps
- Total click count per URL
- Click metadata (timestamp, source, coarse-grained location)

✅ **Client-side validation** for:
- Valid URL structure
- Numeric validity input
- Alphanumeric shortcode constraints

✅ **Robust error handling** with clear user-friendly feedback.

✅ **Material UI (MUI)** for clean, responsive styling.

✅ **Custom Logging Middleware** integration to:
- Log successful operations, warnings, and errors
- Send structured logs to the evaluation test server with `Authorization` token
- Avoids using `console.log`, ensuring evaluation compliance.

---

## 🛠️ Tech Stack

- **React** (with JSX)
- **Material UI (MUI)**
- **React Router DOM**
- **Custom Logging Middleware** (packaged and imported)
- **Vite** for fast React dev environment

---

## 📂 Project Structure

/logging-middleware # Custom reusable logging package
/frontend
/src
/components
ShortenerForm.jsx
StatisticsPage.jsx
/utils
validators.js
App.jsx
main.jsx
index.html
package.json
README.md


---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
(Also run npm install inside /logging-middleware and link if needed)

3️⃣ Start the Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

🪵 Logging Middleware Configuration
Registered and authenticated with:

clientID: d9cbb699-6a27-44a5-8d59-8b1befa816da

clientSecret: (used to obtain token)

Uses the Bearer token obtained from the auth API.

Sends logs for:

URL shortening actions

Redirection events

Validation errors

Logs are sent in the following structure:

json
Copy
Edit
{
  "stack": "frontend",
  "level": "info",
  "package": "component",
  "message": "Shortened URL: https://example.com to abcd12 with expiry 2025-07-14T09:45:00Z"
}
🧪 Testing
You can test:
✅ Valid and invalid URLs.
✅ Optional validity period and shortcode generation.
✅ Duplicate shortcode prevention.
✅ Redirection using short URL.
✅ Viewing statistics with click analytics.
✅ Logging functionality via network requests.

📜 License
This project is developed as part of Campus Hiring Evaluation for Afford Medical Technologies and is intended for evaluation purposes only.

🙏 Acknowledgements
Afford Medical Technologies for providing a structured, practical evaluation challenge.

React, Vite, and MUI for the ecosystem support.


