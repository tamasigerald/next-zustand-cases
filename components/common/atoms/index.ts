import { atom } from "jotai";
import { Product } from "../../../store/store-with-props";

// Create atoms for common components

export const filteredProducts = atom<Product[]>([]);
