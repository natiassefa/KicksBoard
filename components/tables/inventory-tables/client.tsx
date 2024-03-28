"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Shoe } from "@/types";

interface ProductsClientProps {
  data: Shoe[];
}

export const InventoryClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Shoes (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/inventory/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Shoe
        </Button>
      </div>
      <Separator />
      <DataTable  searchKey="name" columns={columns} data={data} />
    </>
  );
};
