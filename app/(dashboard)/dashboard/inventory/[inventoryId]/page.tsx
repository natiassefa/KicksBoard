import BreadCrumb from "@/components/breadcrumb";
import { ShoeForm } from "@/components/forms/shoe-form";
import getShoesWithId from "@/lib/database/functions/get-shoe-id";
import React from "react";

export default async function Page(params: any) {
  const shoe = await getShoesWithId(params.params.inventoryId);
  const breadcrumbItems = [
    { title: "Inventory", link: "/dashboard/inventory" },
    { title: "Create", link: "/dashboard/inventory/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ShoeForm
        categories={[
          { _id: "shirts", name: "shirts" },
          { _id: "pants", name: "pants" },
        ]}
        initialData={shoe}
        key={null}
      />

    </div>
  );
}
