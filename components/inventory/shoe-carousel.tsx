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
import getShoes from "@/lib/database/functions/get-shoes"
import { Shoe } from "@/types"
export async function ShoeCarousel() {
  // call getShoes function to get shoes from firestore database
  const shoes = await getShoes()
  return (
    <div className="flex items-center justify-center">        
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: shoes.length }).map((_, index) => (
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

