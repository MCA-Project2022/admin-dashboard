"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircleIcon, StoreIcon } from "lucide-react";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { UseStoreModel } from "@/hooks/use-store-model";
import { Store } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const storeModel = UseStoreModel();
    const params = useParams();
    const router = useRouter();
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));
    const [open, setOpen] = useState(false);
    const currentStore = formattedItems.find((item) => item.value === params.storeId);
    const onStoreSelect = (store: { label: string, value: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"sm"} role="combobox"
                    aria-expanded={open}
                    aria-label="Select store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 shadow-md rounded-md">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Seach Store..." />
                        <CommandEmpty>
                            Store Not found
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>

                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModel.onOpen();
                                }}
                            >
                                <PlusCircleIcon className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};