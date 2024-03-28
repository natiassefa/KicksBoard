"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shoeLabels } from "@/constants/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import FileUpload from "../file-upload";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import addShoe from "@/lib/database/functions/add-shoe";
import { Shoe } from "@/types";
import { v4 } from "uuid";
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" }),
  // .min(1, { message: "At least one image must be added." }),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ShoeFormProps {
  initialData: any | null;
  categories: any;
}

export const ShoeForm: React.FC<ShoeFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";


  const defaultValues = initialData
    ? initialData
    : {
      name: "",
      description: "",
      price: 0,
      imgUrl: [],
      category: "",
      quantity: 1,
    };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("data", data);
    try {
      setLoading(true);
    
      const shoeName = shoeLabels.
                        findIndex((shoelabel) => 
                        shoelabel.value === data.name) !== -1 ? shoeLabels
                        .find((shoelabel) => 
                        shoelabel.value === data.name)?.label : data.name as string

      const toAdd: Shoe = {
        id: v4(),
        name: shoeName || "",
        price: data.price,
        inStock: data.quantity > 0 ? true : false,
        stock: data.quantity,
        image: "",
        sku: data.name as string,
      };
      // send to add shoe function in lib/database/functions/add-shoe.ts 
      await addShoe(toAdd)
      toast({
        variant: "default",
        title: "Shoe added successfully.",
        description: "Shoe added to inventory.",
      });
      router.push("/dashboard/inventory");
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const triggerImgUrlValidation = () => form.trigger("imgUrl");

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="md:grid md:grid-cols-3 gap-8">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-col ">
                  <FormLabel className="">Shoe</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="flex flex-row">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[500px] p-7 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? shoeLabels.find(
                              (shoelabel) => shoelabel.value === field.value
                            )?.label
                            : "Select Shoe"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Shoe..." />
                        <CommandEmpty>No Shoe found.</CommandEmpty>
                        <CommandGroup>
                          {shoeLabels.map((shoelabel) => (
                            <CommandItem
                              value={shoelabel.label}
                              key={shoelabel.value}
                              onSelect={() => {
                                form.setValue("name", shoelabel.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  shoelabel.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {shoelabel.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price </FormLabel>
                  <FormControl>
                    <Input className="p-7" type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number In Stock</FormLabel>
                  <FormControl>
                    <Input className="p-7" type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
