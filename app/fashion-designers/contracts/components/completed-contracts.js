import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Link,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Calendar, CircleDollarSign } from "lucide-react";
import FilterDropdown from "../../../../components/FilterDropdown";
import { useRouter } from "next/navigation";

export default function CompletedContracts() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [currency, setCurrency] = useState("all");

  const contracts = useMemo(() => [
    {
      id: 1,
      date: "12th May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 2,
      date: "12th May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 3,
      date: "12th May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 4,
      date: "10th May, 2024",
      dateValue: new Date("2024-05-10"),
      project: "Brand Identity Design Package",
      artist: "MARIA SANTOS",
      payment: "$1,200",
      paymentValue: 1200,
      status: "completed",
    },
    {
      id: 5,
      date: "8th May, 2024",
      dateValue: new Date("2024-05-08"),
      project: "Website UI/UX Design",
      artist: "ALEX CHEN",
      payment: "$950",
      paymentValue: 950,
      status: "completed",
    },
    {
      id: 6,
      date: "5th May, 2024",
      dateValue: new Date("2024-05-05"),
      project: "Product Photography Session",
      artist: "DAVID KUMAR",
      payment: "$500",
      paymentValue: 500,
      status: "completed",
    },
  ], []);

  const router = useRouter();

  //handle ongoing contract click
  const handleCompletedClick = (contractId) => {
    router.push(`/fashion-designers/contracts/completed/${contractId}`);
  };

  const columns = [
    { name: "DATE", uid: "date" },
    { name: "PROJECT", uid: "project" },
    { name: "ARTIST", uid: "artist" },
    { name: "PAYMENT", uid: "payment" },
    { name: "ACTION", uid: "action" },
  ];

  const dateOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 month',
    'Last 6 month',
    'This year',
    'Calendar'
  ];

  const currencyOptions = ['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)', 'CAD ($)'];

  const [dateFilter, setDateFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('Currency');

  // Filter and sort contracts
  const filteredAndSortedContracts = useMemo(() => {
    let filtered = contracts;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (contract) =>
          (contract.project ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (contract.artist ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (contract.date ?? "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date Filtering Logic
    const isToday = (date) => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };

    const isWithinLastDays = (date, days) => {
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    };

    // Filter by Date
    if (dateFilter) {
      const now = new Date();
      filtered = filtered.filter((contract) => {
        const cDate = contract.dateValue;

        if (dateFilter === 'Today') return isToday(cDate);
        if (dateFilter === 'This week') return isWithinLastDays(cDate, 7);
        if (dateFilter === 'This month') {
          return cDate.getMonth() === now.getMonth() && cDate.getFullYear() === now.getFullYear();
        }
        if (dateFilter === 'Last 3 month') return isWithinLastDays(cDate, 90);
        if (dateFilter === 'Last 6 month') {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          return cDate >= sixMonthsAgo;
        }
        if (dateFilter === 'This year') return cDate.getFullYear() === now.getFullYear();
        if (dateFilter.includes('-')) {
          // Date from calendar (YYYY-MM-DD)
          const filterDate = new Date(dateFilter);
          return cDate.toDateString() === filterDate.toDateString();
        }
        return true;
      });
    }

    // Filter by Currency
    if (currencyFilter !== 'Currency') {
      filtered = filtered.filter((contract) => {
        if (currencyFilter === 'USD ($)') return contract.payment.startsWith("$");
        if (currencyFilter === 'NGN (₦)') return contract.payment.startsWith("₦");
        if (currencyFilter === 'EUR (€)') return contract.payment.startsWith("€");
        if (currencyFilter === 'GBP (£)') return contract.payment.startsWith("£");
        if (currencyFilter === 'CAD ($)') return contract.payment.includes("CA$") || contract.payment.startsWith("$");
        return true;
      });
    }

    // Sort by most recent date (default)
    const sorted = [...filtered].sort((a, b) => b.dateValue - a.dateValue);

    return sorted;
  }, [search, currencyFilter, dateFilter, contracts]);

  const onSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1); // reset to the first page
  };

  const onSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1); // reset to the first page
  };

  const renderCell = React.useCallback((contract, columnKey) => {
    const cellValue = contract[columnKey] ?? "";

    switch (columnKey) {
      case "date":
        return <div className="text-sm">{cellValue}</div>;
      case "project":
        return <div className="font-satoshi">{cellValue}</div>;
      case "artist":
        return (
          <Link
            href="#"
            style={{ color: "#3A98BB" }}
            className="font-satoshi text-sm"
            underline="none"
          >
            {cellValue}
          </Link>
        );
      case "payment":
        return <div className="font-satoshi text-sm ">{cellValue}</div>;
      case "action":
        return (
          <span onClick={(e) => e.stopPropagation()}>
            <Button
              className="bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-proximanova rounded-full border-0 shadow-sm"
              size="sm"
              onPress={() => {
                const returnPath = encodeURIComponent('/fashion-designers/contracts?tab=completed');
                router.push(`/fashion-designers/contracts/retain?artist=${contract.artist || 'Ocean'}&returnUrl=${returnPath}`);
              }}
            >
              Retain Artist
            </Button>
          </span>
        );
      default:
        return cellValue;
    }
  }, [router]);


  // Pagination calculations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(
    filteredAndSortedContracts.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedContracts.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-full mx-auto ">
      {/* Search and Filter Bar */}
      <div className="mt-8 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input - Always left-aligned */}
          <div className="flex items-center gap-3 w-full md:flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Project"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="w-full md:max-w-md"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 pr-2",
              }}
              endContent={
                <div className="flex items-center gap-1">
                  <Dropdown placement="bottom-end" classNames={{ content: 'min-w-[150px]' }}>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600 min-w-8 w-8 h-8 rounded-full"
                      >
                        <Calendar size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Date Filter"
                      onAction={(key) => {
                        setDateFilter(key);
                        setCurrentPage(1);
                      }}
                      selectedKeys={[dateFilter]}
                      selectionMode="single"
                    >
                      {dateOptions.map((option) => (
                        <DropdownItem key={option}>{option}</DropdownItem>
                      ))}
                      <DropdownItem key="" className="text-danger" color="danger">
                        Reset Date
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown placement="bottom-end" classNames={{ content: 'min-w-[150px]' }}>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600 min-w-8 w-8 h-8 rounded-full"
                      >
                        <CircleDollarSign size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Currency Filter"
                      onAction={(key) => {
                        setCurrencyFilter(key);
                        setCurrentPage(1);
                      }}
                      selectedKeys={[currencyFilter]}
                      selectionMode="single"
                    >
                      {currencyOptions.map((option) => (
                        <DropdownItem key={option}>{option}</DropdownItem>
                      ))}
                      <DropdownItem key="Currency" className="text-danger" color="danger">
                        Reset Currency
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              }
            />
          </div>

          <div className='flex items-center justify-center md:justify-start gap-4 md:gap-3 w-full md:w-auto pb-1 md:pb-0'>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {
        search && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedContracts.length} of {contracts.length}{" "}
              contracts
              {search && ` for "${search}"`}
            </p>
          </div>
        )
      }

      {/* Table - Responsive View */}
      <Card className="w-full mt-4 !overflow-visible" shadow="none">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table
              aria-label="Completed contracts table"
              classNames={{
                wrapper: "shadow-none rounded-none min-w-[700px] md:min-w-full",
                th: "bg-[#CCE7F2] text-xs uppercase tracking-wide",
                td: "py-4 px-2",
                tbody: "divide-y divide-gray-100",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} className="text-justify">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                /* items={filteredAndSortedContracts} */
                items={currentItems}
                emptyContent={
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {search
                        ? `No contracts found matching "${search}"`
                        : "No contracts found"}
                    </p>
                  </div>
                }
              >
                {(item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleCompletedClick(item.id)}
                  >
                    {(columnKey) => (
                      <TableCell className="py-3 text-left">
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Pagination */}
      {
        totalPages > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              {/* Results info */}
              <span className="text-sm text-gray-600 mr-4">
                {startIndex + 1} -{" "}
                {Math.min(endIndex, filteredAndSortedContracts.length)} of{" "}
                {filteredAndSortedContracts.length}
              </span>

              {/* Previous button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage(currentPage - 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>

              {/* Next button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === totalPages}
                onPress={() => setCurrentPage(currentPage + 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer -ml-2"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
}
