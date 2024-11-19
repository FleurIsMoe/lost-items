import dynamic from "next/dynamic";

const DynamicLostItemsComponent = dynamic(() => import("@/app/pages/main"));

export default function LostItemsComponentClient() {
  return <DynamicLostItemsComponent />;
}
