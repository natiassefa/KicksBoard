
"use client";
import { Shoe } from "@/components/inventory/shoe-carousel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { cn } from "@/lib/utils";

interface ShoesInventoryProps {
    data: Shoe[];
  }

  
export const InventoryTable: React.FC<ShoesInventoryProps> = ({ data }) => {
    const router = useRouter();
  
    return (
      <>
      <div >
        <div className="flex items-start justify-between">
          <Heading
            title={`Shoes (${data.length})`}
            description="Manage users (Client side table functionalities.)"
          />
          <Button
            className="text-xs md:text-sm"
            onClick={() => console.log("Add new shoe")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        
        <DataTable  searchKey="name" columns={columns} data={data} />
            </div>
        
      </>
    );
  };
  