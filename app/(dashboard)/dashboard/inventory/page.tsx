import BreadCrumb from "@/components/breadcrumb";
import React from 'react';
import getShoes from "@/lib/database/functions/get-shoes";
import { InventoryClient } from "@/components/tables/inventory-tables/client";


const breadcrumbItems = [{ title: "Inventory", link: "/dashboard/inventory" }];
export default async function page() {
  const shoes = await getShoes();
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <InventoryClient data={shoes} />
      </div>
    </>
  );
};
