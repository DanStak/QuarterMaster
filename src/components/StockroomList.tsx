import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {db} from "@/libraries/db";
import Link from "next/link";

const getStockRooms = async () => {
    const session = await getServerSession(authOptions);

    if(session) {
        return db.stockroom.findMany({
            where: {
                ownerId: session.user.id
            }
        })
    }

    return [];
}
const StockroomsList = async () => {
    const data = await getStockRooms();
    return (
        <div>
            LISTA MAGAZYNÓW

            <ul>
                {data ? data.map((item) => (
                    <li className='text-xl' key={item.id}>
                        <Link href={`/stockroom/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>
                )) : null}
            </ul>
        </div>
    );
};

export default StockroomsList;
