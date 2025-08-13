import LicenseFlow from "./components/license-flow";


export default function LicenseFlowPage({ searchParams }) {
  const productId = searchParams?.id || null;
  return <LicenseFlow productId={productId} />;
}