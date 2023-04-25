import React from 'react';
import {SignOutButton} from "@/components/SignOutButton";
import StockroomsList from "@/components/StockroomList";
import {StockroomCreateForm} from "@/components/StockroomCreateForm";
const DashboardPage = () => {

    return (
        <div>
            Dashboard

            <SignOutButton/>
            {// @ts-expect-error Server Component
            <StockroomsList/>}

            <StockroomCreateForm/>
        </div>
    );
};

export default DashboardPage;
