'use client';

import dynamic from "next/dynamic";

const DynamicLostItemsComponent = dynamic(() => import("@/app/pages/main"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  ),
});

export default function ClientWrapper() {
  return <DynamicLostItemsComponent />;
}
