'use client';

import React, { useMemo } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@heroui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const getActions = (status) => [
    { key: 'view', label: 'View Details', icon: '👁️' },
    { key: 'chat', label: 'Open Chat', icon: '💬' },
    { key: 'download', label: 'Download Contract', icon: '📥' },
    ...(status !== 'Completed' && status !== 'Cancelled'
        ? [{ key: 'complete', label: 'Mark Completed', icon: '✅' }]
        : []),
    ...(status !== 'Cancelled' && status !== 'Completed'
        ? [{ key: 'cancel', label: 'Cancel Contract', icon: '🚫', danger: true }]
        : []),
];

export default function ContractDropdown({ contract }) {
    const router = useRouter();
    const actions = useMemo(() => getActions(contract.status), [contract.status]);

    const handleAction = (key) => {
        if (key === 'view') {
            router.push(`/artist-page/contract-information/${contract.id}`);
        }
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                    aria-label="Contract actions"
                >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Contract actions"
                onAction={handleAction}
                className="min-w-[180px]"
            >
                {actions.map((action) => (
                    <DropdownItem
                        key={action.key}
                        startContent={<span className="text-sm">{action.icon}</span>}
                        className={
                            action.danger
                                ? 'text-red-500 hover:bg-red-50'
                                : 'text-gray-700 hover:bg-gray-50'
                        }
                    >
                        {action.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
