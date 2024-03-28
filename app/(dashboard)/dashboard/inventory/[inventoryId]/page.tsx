import BreadCrumb from "@/components/breadcrumb";
import { ShoeForm } from "@/components/forms/shoe-form";
import React from "react";

export default function Page() {
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
        initialData={null}
        key={null}
      />

    </div>
  );
}
