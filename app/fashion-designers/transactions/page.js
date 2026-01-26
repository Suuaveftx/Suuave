'use client';

import React from "react";
import TransactionTable from "../_components/TransactionTable";

const TransactionHistoryPage = () => {
    return (
        <div className="w-full min-h-screen lg:px-14 px-4 pt-10 pb-20">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-10">
                    <h1 className="text-[32px] font-bold text-[#222222] mb-2">Transaction History</h1>
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
