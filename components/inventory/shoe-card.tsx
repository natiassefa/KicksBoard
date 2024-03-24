import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Shoe } from "./shoe-carousel";
import { cn } from "@/lib/utils";

export async function ShoeCard(...props: any) {

    
    const checkInStock = (shoeInfo: Shoe) => {
        if(shoeInfo.inStock === false ) {
            return <CardTitle className={cn("text-red-400 text-sm italic")}>
                        Out of Stock 
                    </CardTitle>
        } else {
            return <CardTitle className={cn("text-grey-400 text-sm italic font-thin")}>
                        In Stock: {shoeInfo.stock} left
                    </CardTitle>
        }
    }
    return(
        <>
        <Card>
        <CardHeader>
        <CardTitle>{props[0]?.name} </CardTitle>
        {checkInStock(props[0])} 

      </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-4">
                  <span className="text-xl font-semibold">

                
                <img alt="GeeksforGeeks logo" className={cn("-mt-10 ")}/>
                <p className={cn("pt-4 text-right")}>${props[0]?.price}</p>
                    </span>
                </CardContent>
              </Card>
        </>
    )

}

