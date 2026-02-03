import ProductDetails from "../../_components/collections/ProductDetails";

export default async function page({ params }) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}
