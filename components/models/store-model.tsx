"use client";

import { UseStoreModel } from "@/hooks/use-store-model";
import { Model } from "@/components/ui/model";


export const StoreModel = () => {
    const useStoreModel = UseStoreModel();
    return (
        <Model title="Create Store"
            description="Add a new store"
            isOpen={useStoreModel.isOpen}
            onClose={useStoreModel.onClose}>
            Future Create Store Form
        </Model>
    );

};