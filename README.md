# AdvisorOS - AI Productivity Dashboard

A blue-and-white web app prototype for financial advisors working in AAG / ASG-style money-management teams.

## What is inside

- Jarvis-style morning dashboard
- ADHD-friendly checklist grouped by Deadlines, Follow Ups, Client Meeting, and Team Meetings
- AI quick capture by chatbot, simulated voice, or manual category selection
- Client expense intelligence and money-leak detection
- Today / week / month calendar planning
- Nearby webinar and networking suggestions
- Proactive AI reminder queue with advisor approval

## Run locally

Install dependencies once, then start Vite:

```sh
npm install
npm run dev
```

Then open:

```text
http://localhost:4173
```

## Build and validate

```sh
npm run build
npm run validate
```

The Vite build is generated in:

```text
dist/
```

For Vercel, point the project root at this repository root so it can find package.json and index.html.

Edit the app in:

```text
index.html
src/main.js
src/style.css
```
