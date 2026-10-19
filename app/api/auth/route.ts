// app/api/auth/route.ts
// Re-export handlers from the catch‑all route to satisfy Next.js expectations.
import { GET, POST } from "./[...all]/route";
export { GET, POST };
