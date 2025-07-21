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
} from "@heroicons/react/24/outline";

export default function CompletedContracts() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const contracts = [
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
    {
      id: 7,
      date: "03 May, 2024",
      dateValue: new Date("2024-05-03"),
      project: "Logo Design and Branding",
      artist: "SARAH JOHNSON",
      payment: "$800",
      paymentValue: 800,
      status: "completed",
    },
    {
      id: 8,
      date: "01 May, 2024",
      dateValue: new Date("2024-05-01"),
      project: "Social Media Graphics Package",
      artist: "MIKE RODRIGUEZ",
      payment: "$450",
      paymentValue: 450,
      status: "completed",
    },
  ];

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
          contract.project.toLowerCase().includes(search.toLowerCase()) ||
          contract.artist.toLowerCase().includes(search.toLowerCase()) ||
          contract.date.toLowerCase().includes(search.toLowerCase())
      );
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
  }, [search, sortBy]);

  const onSearchChange = (value) => {
    setSearch(value);
  };

  const onSortChange = (value) => {
    setSortBy(value);
  };

  const renderCell = React.useCallback((contract, columnKey) => {
    const cellValue = contract[columnKey];

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
        return <div className="font-satoshi text-sm">{cellValue}</div>;
      case "status":
        return (
          <Chip color="none" size="sm" variant="flat" className="capitalize">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

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

          {/* Sort & Filter Section */}
          <div className="relative flex items-center gap-2">
            {/* Filter Icon - Only for mobile view */}
            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden p-2 border-0"
              aria-label="Filter"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Desktop Dropdown with Filter Icon inside */}
            <div className="relative hidden md:flex items-center">
              {/* Left-aligned Filter Icon */}
              <div className="absolute left-0 pl-3 flex items-center pointer-events-none z-10">
                <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Chevron on the right */}
              <div className="absolute right-0 pr-3 flex items-center pointer-events-none z-10">
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Select input */}
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-sm text-gray-700 border border-gray-300 rounded-full pl-10 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full min-w-[180px]"
              >
                <option value="date">Sort by Date</option>
                <option value="project">Sort by Project</option>
                <option value="artist">Sort by Artist</option>
                <option value="payment">Sort by Payment</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
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
              td: "py-4 px-4",
              tbody: "divide-y divide-gray-100",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} className="text-left">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={filteredAndSortedContracts}
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
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {(columnKey) => (
                    <TableCell className="py-4">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
