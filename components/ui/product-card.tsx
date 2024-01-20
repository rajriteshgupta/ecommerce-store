"use client";

import Image from "next/image";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import useFavourites from "@/hooks/use-favourites";

interface ProductCardProps {
    data: Product;
}

const ProductCard:React.FC<ProductCardProps> = ({
    data
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const { isSignedIn } = useAuth();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cart = useCart();
    const previewModal = usePreviewModal();
    const router = useRouter();
    const favourites = useFavourites();

    const isFavourite = favourites.items.find((item) => item.id === data.id);

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }
    
    const onAddToFavourites: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if(isSignedIn) {
            if(isFavourite) {
                favourites.removeItem(data.id);
            }
            else {
                favourites.addItem(data);
            }
        }
        else {
            toast.error("Please Sign in first.");
        }
    }
    
    if(!isMounted){
        return null;
    }

    return ( 
        <div 
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
        >
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image 
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                            onClick={ onPreview }
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        <IconButton 
                            onClick={ onAddToCart }
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Description and Favourites */}
            <div className="flex w-full justify-between">
                <div>
                    <p className="font-semibold text-lg">
                        {data.name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {data.category?.name}
                    </p>
                </div>
                <div className="flex items-end">
                    <IconButton 
                        onClick={ onAddToFavourites }
                        icon={<Heart 
                                size={20} 
                                fill={isFavourite ? "red" : "transparent"}
                                color="red"
                            />}
                    />
                </div>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
     );
}
 
export default ProductCard;