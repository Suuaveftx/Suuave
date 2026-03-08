import ProductDetails from "../../_components/collections/ProductDetails";

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}
