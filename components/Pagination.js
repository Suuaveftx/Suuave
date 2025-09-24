import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PaginationTab() {
  return (
    <div className="flex items-center w-full max-w-md  px-4 py-2  gap-4">
      {/* Text */}
      <p className="text-sm text-gray-600">1–5 of 12</p>

      {/* Navigation */}
      <div className="flex">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
