import BreadCrumb from "@/components/breadcrumb";
import React from 'react';
import { Shoe, ShoeCarousel } from "@/components/inventory/shoe-carousel";
import { InventoryTable } from "@/components/tables/inventory-tables/inventory-table";
import { users } from "@/constants/data";
import { UserClient } from "@/components/tables/user-tables/client";
import { Separator } from "@/components/ui/separator";



const breadcrumbItems = [{ title: "Inventory", link: "/dashboard/inventory" }];
export default function page() {
  return (
    <>
 
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        {/* <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        
        <Separator />
        <InventoryTable data={shoes} />
              
              
              
      </div>

    </>

  );
};

const shoes: Shoe[] = [
  {
    id: 0,
    name: "Nike Air Max 90",
    price: 120,
    image: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
    inStock: false,
    stock: 10,
  },
  {
    id: 1,
    name: "Nike Air Max 180",
    price: 160,
    image: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
    inStock: false,
    stock: 10,
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    price: 180,
    image: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-03.jpg",
    inStock: false,
    stock: 10,
  },
  {
    id: 3,
    name: "Nike Air Max 720",
    price: 200,
    image: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-04.jpg",
    inStock: true,
    stock: 10,
  },
  {
    id: 4,
    name: "Nike Air Max 720",
    price: 200,
    image: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-04.jpg",
    inStock: false,
    stock: 10,
  },
]
