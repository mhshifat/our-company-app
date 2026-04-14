import { LandingPage } from "@/components/landing/landing-page";
import { listPosts } from "@/lib/blog";

export default async function Home() {
  const { items } = await listPosts({ page: 1, pageSize: 3 });
  return <LandingPage blogPosts={items} />;
}
