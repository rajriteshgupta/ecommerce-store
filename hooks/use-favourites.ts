import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Product } from "@/types";

interface FavouritesStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    moveItem: (id: string) => void;
    removeAll: () => void;
};

const useFavourites = create(
    persist<FavouritesStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem) {
                return toast("Item already in favourites.");
            }

            set({items: [...get().items, data]});
            toast.success("Item added to favourites.");
        },
        removeItem: (id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id)]});
            toast.success("Item removed from the favourites.")
        },
        moveItem: (id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id)]});
        },
        removeAll: () => set({items: []}),
    }), {
        name: "favourites-storage",
        storage: createJSONStorage(() => localStorage)
    })
)
export default useFavourites;