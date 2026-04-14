import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { NotFoundBody } from "@/components/landing/not-found-body";
import { getNavigationContent } from "@/lib/navigation-content";
import { getNotFoundContent } from "@/lib/not-found-content";

export default async function NotFound() {
  const [nav, content] = await Promise.all([
    getNavigationContent(),
    getNotFoundContent(),
  ]);

  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />
      <NotFoundBody content={content} />
    </div>
  );
}
