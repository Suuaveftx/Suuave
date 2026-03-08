'use client';

import React from "react";
import TransactionTable from "../_components/TransactionTable";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TransactionHistoryPage = () => {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen lg:px-14 px-4 pt-4 pb-20">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            className="lg:hidden text-[#222222]"
                            onPress={() => router.push('/fashion-designers')}
                        >
                            <ArrowLeft size={24} />
                        </Button>
                        <h1 className="text-[32px] font-bold text-[#222222]">Transaction History</h1>
                    </div>
                    <p className="text-[#888888] text-lg">
                        The list below shows your credit and debit transactions.
                    </p>
                </div>

                <TransactionTable />
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
