'use client';

import React from "react";
import TransactionTable from "../_components/TransactionTable";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";

const TransactionHistoryPage = () => {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen pb-20 bg-[#F5F8FA] lg:bg-transparent">
            <PageContainer withTopSpacing className="!px-0 lg:!px-8">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center gap-1 mb-4 px-4 pt-2">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => router.back()}
                        className="min-w-fit flex items-center justify-center rounded-full w-9 h-9 bg-transparent text-gray-500"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-[20px] font-semibold text-[#222222]">Transactions</h1>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-[28px] font-bold text-[#222222]">Transaction History</h1>
                    </div>
                    <p className="text-[#888888] text-lg">
                        The list below shows your credit and debit transactions.
                    </p>
                </div>

                <div className="px-4 lg:px-0">
                    <TransactionTable />
                </div>
            </PageContainer>
        </div>
    );
};

export default TransactionHistoryPage;
