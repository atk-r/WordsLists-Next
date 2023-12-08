Simplest possible Nextjs auth demo with a complete auth flow and sessions

- Uses [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for login/signup database
- JWT for verification
- Plain cookies for auth session

1. Clone this or setup your project on Vercel
2. Link a [KV Storage](https://vercel.com/dashboard/stores) to your project
3. Set environment variables equal to the `.env.template` file
   - `vercel link` & `vercel env pull` on the CLI to use your KV variables
   - Add a `JWT_SECRET` variable
4. Test locally or deploy. Nothing else