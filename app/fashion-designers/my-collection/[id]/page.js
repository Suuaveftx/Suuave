import MobileDetails from "../../_components/collections/MobileDetails";

export default function page({ params }) {
  return <MobileDetails id={params.id} />;
}
