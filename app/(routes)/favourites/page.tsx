"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useFavourites from "@/hooks/use-favourites";
import FavouriteItem from "./components/favourite-item";
import { useAuth } from "@clerk/nextjs";

const FavouritesPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { isSignedIn } = useAuth();
    const favourites = useFavourites();

    if(!isSignedIn) {
        favourites.items = [];
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return ( 
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Favourites</h1>
                    <div className="mt-12 lg:grid lg:items-start gap-x-12">
                        {favourites.items.length === 0 && 
                            <p className="text-neutral-500">
                                No items in your favourites
                            </p>
                        }
                        <ul>
                            {favourites.items.map((item) => (
                                <FavouriteItem 
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default FavouritesPage;