import React, { useEffect } from "react";
import { Column, Data, StickyHeadTable } from "../Table/CountryTable";
import "./CountryInfo.scss"

export type Country = {
    countryName: string;
    countryCode: string;
    countryContinent: string;
    countryPopulation: string;
}

function createData(countryName: string, countryCode: string, countryContinent: string,  countryPopulation: string): Data {
    return { countryName, countryCode, countryContinent,  countryPopulation};
}

export const CountryInfo = () =>{
    const columns: Column[] = [
        { id: 'countryName', label: 'Country Name', minWidth: 100 },
        { id: 'countryCode', label: 'Country Code', minWidth: 100 },
        {
          id: 'countryContinent',
          label: 'Country Continent',
          minWidth: 100
        },
        {
          id: 'countryPopulation',
          label: 'Country Population',
          minWidth: 100
        }
    ];

    const [countryPageDetails, setCountryPageDetails] = React.useState<Country[]>([]);

        useEffect(()=>{
            fetch(`http://localhost:8099/v1/country/service/get/countries`)
            .then((response)=> response.json()).then((data)=> setCountryPageDetails(data));
        }, []);
    return(
        <div>
            <StickyHeadTable columns={columns} rows={countryPageDetails!}></StickyHeadTable>
        </div>
    );
}