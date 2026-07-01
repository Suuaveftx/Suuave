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
        <div className="w-full min-h-screen pb-20">
            <PageContainer withTopSpacing>
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">

                        <h1 className="text-[28px] font-bold text-[#222222]">Transaction History</h1>
                    </div>
                    <p className="text-[#888888] text-lg">
                        The list below shows your credit and debit transactions.
                    </p>
                </div>

                <TransactionTable />
            </PageContainer>
        </div>
    );
};

export default TransactionHistoryPage;
