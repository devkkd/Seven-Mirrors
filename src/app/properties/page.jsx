import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import PropertiesListing from "@/components/PropertiesListing";

export const metadata = {
  title: "Properties of Seven Mirror Stays",
  description: "Browse our hand-picked private villas and residences across Jaipur and Gurugram.",
};

async function PropertiesContent({ searchParams }) {
  const sp = await searchParams;
  const city = typeof sp?.city === "string" ? sp.city : null;

  return (
    <>
      {/* search bar yahan rakha hai, taaki search ke baad uski selected values reset na hon */}
      <div className="relative z-30 px-5">
        <SearchBar inline />
      </div>

      {/* key = city badle to listing naye filters ke saath dobara bante hain */}
      <PropertiesListing key={city ?? "all"} initialCity={city} />
    </>
  );
}

export default function PropertiesPage({ searchParams }) {
  return (
    <main className="bg-white pb-20 pt-6">
      <Suspense fallback={<div className="min-h-screen" />}>
        <PropertiesContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}