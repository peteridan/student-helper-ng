# Student Helper NG

Student Helper NG is a web app for Nigerian secondary school students. It includes:

- Firebase email/password login
- homework and study planning
- WAEC/JAMB subject registration
- score tracking and analytics
- CBT practice
- Gemini-powered AI tutor

## Local run

1. Set your Gemini key:

```powershell
$env:GEMINI_API_KEY="your_gemini_api_key_here"
```

2. Start the server:

```powershell
npm start
```

3. Open:

```text
http://localhost:5500
```

## Deploy

### Recommended: Render

This project is ready to deploy as a single Node web service on Render.

#### 1. Push the project to GitHub

Create a GitHub repository and push the full project.

#### 2. Create a Web Service on Render

On Render:

1. Click `New +`
2. Choose `Web Service`
3. Connect your GitHub repository

#### 3. Use these settings

- Environment: `Node`
- Build command: leave empty
- Start command: `npm start`

#### 4. Add environment variable

- Key: `GEMINI_API_KEY`
- Value: your Gemini API key

#### 5. Deploy

Render will build and start:

```text
npm start
```

The same service will serve:

- the website frontend
- the `/api/ai-chat` Gemini backend

### Optional: Firebase + Cloud Run

The project still includes Firebase and Cloud Run config files, but Render is now the easiest recommended deployment path.

## Notes

- Keep `GEMINI_API_KEY` on the server only.
- The Firebase config in the frontend is expected for browser auth and is separate from Gemini.
- Render free services may sleep after idle time, so the first request can be slow.
