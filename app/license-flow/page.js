"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LicenseFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState(null);

  // Extract the productId from query params on mount
  useEffect(() => {
    const idFromQuery = searchParams.get("id");
    setProductId(idFromQuery);
  }, [searchParams]);

  const completeLicense = () => {
    if (!productId) {
      alert("No product ID found!");
      return;
    }

    try {
      const storedLicenses = localStorage.getItem("licenses");
      const licenses = storedLicenses ? JSON.parse(storedLicenses) : {};

      licenses[productId] = true;
      localStorage.setItem("licenses", JSON.stringify(licenses));

      router.push(`/fashion-designers/${productId}`);
    } catch (error) {
      console.error("Failed to save license:", error);
    }
  };

  if (!productId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-red-500">
          Invalid license page — missing product ID.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">
          License Page for Product {productId}
        </h1>
        <Button
          className="rounded-full w-[70%] mx-auto text-customWhiteBgText text-lg h-12 px-9 py-1 shadow-md  font-semibold "
          style={{
            background:
              "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
          }}
          onPress={completeLicense}
        >
          Complete Licensing
        </Button>
      </div>
    </div>
  );
}
