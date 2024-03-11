import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ShoeCard } from "./shoe-card"
import { cn } from "@/lib/utils"

export function ShoeCarousel() {
  return (
    <div className="flex items-center justify-center">        
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <ShoeCard {...shoes[index]} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious  className={cn("mr-4")} />
      <CarouselNext />
    </Carousel>
    </div>
  )
}

export type Shoe = {
  id: number,
  name: string
  price: number
  image: string
  inStock: boolean
  stock: number
}

// Use supabase to fetch data from the database and display it in the carousel
const shoes: Shoe[] = [
  {
    id: 0,
    name: "Nike Air Max 9",
    price: 120,
    image: "https://reactnative.dev/img/tiny_logo.png",
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
    stock: 0,
  },
]