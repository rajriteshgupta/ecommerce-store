"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, UserRound } from "lucide-react";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { UserButton, useAuth } from "@clerk/nextjs";
import useFavourites from "@/hooks/use-favourites";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { isSignedIn } = useAuth();
    const router = useRouter();
    const cart = useCart();
    const favourites = useFavourites();

    if(!isSignedIn) {
        favourites.items = [];
    }

    if(!isMounted){
        return null;
    }
    
    return ( 
        <div className="ml-auto flex items-center gap-x-4">
            <Button
                onClick={() => router.push("/favourites")}
                className="flex items-center px-3 py-2 bg-white shadow-lg"
            >
                <Heart 
                    fill="red"
                    size={20}
                    color="red"
                />
                <span className="ml-2 text-sm text-gray-700">{favourites.items.length}</span>
            </Button>

            {isSignedIn && <UserButton afterSignOutUrl="/"/>}
            {!isSignedIn && 
            <Button
                onClick={() => router.push("/cart")}
                className="flex items-center px-1 py-1 bg-white shadow-lg"
            >
                <UserRound 
                    onClick={() => router.push("/sign-in")}
                    size={24}
                    className="text-gray-700"
                />
            </Button>}
            <Button
                onClick={() => router.push("/cart")}
                className="flex items-center px-3 py-2 bg-white shadow-lg"
            >
                <ShoppingBag
                    size={20}
                    color="black"
                />
                <span className="ml-2 text-sm text-gray-700">{cart.items.length}</span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;