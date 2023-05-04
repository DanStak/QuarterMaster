import { User } from "next-auth"
import {NextApiRequest, NextApiResponse} from "next";
import {Session} from "next-auth";
type UserId = string

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserId
        }
    }
}

export interface RouteArgs {
    req: NextApiRequest,
    res: NextApiResponse,
    session?: Session
}

export interface ItemOfProduct {
    productId: string,
    expirationDate?: string,
    addDate?: string,
    price?: number,
    id?: string,
}

export interface Product {
    name: string,
    id: string,
}

export interface ProductWithItems extends Product {
    items: ItemOfProduct[],
}