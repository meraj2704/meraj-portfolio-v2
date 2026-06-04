import type { SiteProfile } from "@/lib/about";
import CtaSectionView from "./CtaSectionView";

// The CTA bio falls back to its own intro copy (distinct from the About-Me
// lead) until the About singleton's `lead` is filled in via the admin panel.
const FALLBACK_BIO =
  "Based in Dhaka, I am a full-stack developer and digital designer. My passion for minimalist aesthetics, elegant typography, and intuitive design is evident in my work.";

export default function CtaSection({ profile }: { profile: SiteProfile }) {
  return (
    <CtaSectionView
      content={{
        bio: profile.lead || FALLBACK_BIO,
        email: profile.email || "hello@meraj.dev",
        phone: profile.phone || "+880 1700 000 000",
        avatarUrl: profile.avatarUrl || "/meraj-profile.jpg",
      }}
    />
  );
}
