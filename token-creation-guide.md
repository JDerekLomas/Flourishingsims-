# Create a Vercel Token (Correct Way)

1. Go to: https://vercel.com/account/tokens

2. Click "Create Token" button

3. IMPORTANT Settings:
   - Token Name: "Flourishing Sims Deploy"
   - Scope: Select "Full Account" (NOT "Projects")
   - Expiration: "No Expiration" or set a long duration

4. Click "Create"

5. Copy the ENTIRE token - it should be a long string like:
   `vercel_1a2b3c4d5e6f7g8h9i0j...` (much longer than what you gave)

6. The token should be 40+ characters long

## Alternative: Manual Deploy (Faster!)

Since token auth is tricky, just do this:

1. Go to: https://flourishingsims1.vercel.app
2. If it's broken, go to: https://vercel.com/dashboard
3. Find your project
4. Settings → Git → Set branch to: claude/sims-psychological-needs-011CUKSGjyEyM5FQhdFWbP5z
5. Back to Overview → Deployments → Find latest → Click "⋮" → "Redeploy"

Done!
