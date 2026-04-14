import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { listPosts } from "@/lib/blog";
import { getHomeContent } from "@/lib/home-content";
import { getNavigationContent } from "@/lib/navigation-content";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getHomeContent();
  return {
    title: page?.metaTitle ?? page?.title,
    description: page?.metaDesc,
  };
}

export default async function Home() {
  const [{ content }, { items }, nav] = await Promise.all([
    getHomeContent(),
    listPosts({ page: 1, pageSize: 3 }),
    getNavigationContent(),
  ]);
  return <LandingPage content={content} blogPosts={items} nav={nav} />;
}
