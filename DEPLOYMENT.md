# AR3 Prototype Deployment

## Local setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create `.env.local` from the example:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your rotated OpenAI API key:
   ```bash
   OPENAI_API_KEY=sk-...
   ```

4. Run locally:
   ```bash
   pnpm dev
   ```

If no `OPENAI_API_KEY` is configured, the app still works with the built-in ENG 111 mock report.

## Vercel setup

1. Push this project to GitHub.
2. Import the GitHub repository in Vercel.
3. Add this environment variable in Vercel Project Settings:
   ```bash
   OPENAI_API_KEY=your_rotated_key
   ```
4. Optional: add `OPENAI_MODEL` if you want to override the default model.
5. Deploy.

Never commit `.env.local` or any real API key to GitHub.
