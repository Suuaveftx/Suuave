import ProductDetails from "../../_components/collections/ProductDetails";

export default function page({ params }) {
  return <ProductDetails id={params.id} />;
}
