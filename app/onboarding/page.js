import { redirect } from "next/navigation";

function OnboardingPage() {
  redirect("/onboarding/choose-category");
}

export default OnboardingPage;
