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
  Card,
  CardBody,
  Input,
  Button,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import FilterDropdown from "../../../../components/FilterDropdown";
import { useRouter } from "next/navigation";

export default function CompletedContracts() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

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

  const contracts = useMemo(() => [
    {
      id: 1,
      date: "12 May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 2,
      date: "12 May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 3,
      date: "12 May, 2024",
      dateValue: new Date("2024-05-12"),
      project: "Modern Fashion Attire Illustration",
      artist: "SHOALA ADIH",
      payment: "$700",
      paymentValue: 700,
      status: "completed",
    },
    {
      id: 4,
      date: "10 May, 2024",
      dateValue: new Date("2024-05-10"),
      project: "Brand Identity Design Package",
      artist: "MARIA SANTOS",
      payment: "$1,200",
      paymentValue: 1200,
      status: "completed",
    },
    {
      id: 5,
      date: "08 May, 2024",
      dateValue: new Date("2024-05-08"),
      project: "Website UI/UX Design",
      artist: "ALEX CHEN",
      payment: "$950",
      paymentValue: 950,
      status: "completed",
    },
    {
      id: 6,
      date: "05 May, 2024",
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
    router.push(`/artist-page/my-contracts/completed/${contractId}`);
  };

  const columns = [
    { name: "DATE", uid: "date" },
    { name: "PROJECT", uid: "project" },
    { name: "ARTIST", uid: "artist" },
    { name: "PAYMENT", uid: "payment" },
    { name: "STATUS", uid: "status" },
  ];

  // Filter and sort contracts
  const filteredAndSortedContracts = useMemo(() => {
    let filtered = contracts;

    // Apply search filter
    if (search) {
      filtered = contracts.filter(
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

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.dateValue - a.dateValue; // Most recent first
        case "project":
          return a.project.localeCompare(b.project);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "payment":
          return b.paymentValue - a.paymentValue; // Highest first
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return sorted;
  }, [search, sortBy, contracts, dateFilter, currencyFilter]);

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
      case "status":
        return (
          <Chip color="none" size="md" variant="flat" className=" capitalize">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

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
    <div className="w-full max-w-6xl mx-auto ">
      {/* Search and Filter Bar */}
      <div className="mt-8 pb-2">
        <div className="flex items-center justify-between gap-4">
          {/* Search Input - Always left-aligned */}
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by project, artist, or date"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="flex-1 md:max-w-md md:flex-none"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
              }}
              isClearable
              onClear={() => onSearchChange("")}
            />
          </div>

          <div className='flex items-center gap-3'>
            <FilterDropdown
              label='Select Date'
              options={dateOptions}
              selectedOption={dateFilter}
              setSelectedOption={(val) => {
                setDateFilter(val);
                setCurrentPage(1);
              }}
              defaultLabel='Select Date'
            />
            <FilterDropdown
              label='Currency'
              options={currencyOptions}
              selectedOption={currencyFilter}
              setSelectedOption={(val) => {
                setCurrencyFilter(val);
                setCurrentPage(1);
              }}
              defaultLabel='Currency'
            />
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {search && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedContracts.length} of {contracts.length}{" "}
            contracts
            {search && ` for "${search}"`}
          </p>
        </div>
      )}

      {/* Table */}
      <Card className="w-full mt-4">
        <CardBody className="p-0">
          <Table
            aria-label="Completed contracts table"
            classNames={{
              wrapper: "shadow-none rounded-none",
              th: "bg-[#CCE7F2] text-xs uppercase tracking-wide",
              td: "py-4 px-1",
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
        </CardBody>
      </Card>

      {/* Pagination */}
      {totalPages > 0 && (
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
      )}
    </div>
  );
}
