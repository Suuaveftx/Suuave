import { redirect } from "next/navigation";

function AuthPage() {
  redirect("/auth/login-options");
}

export default AuthPage;
