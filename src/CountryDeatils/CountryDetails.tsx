import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { preProcessFile } from "typescript";
import { Country } from "../Country/CountryInfo";
import "./CountryDetails.scss"


export type Details = {
    capital: string;
    president: string;
    independenceDay: string;
    noOfStates: string;
    officialLanguage: string;
    independenceYear: string;
    nationalAnimal: string;
    nationalBird: string;
    nationalSport: string;
    nationalAnthem: string;
    nationalAward: string;
    nationalCurrency: string;
    governmentForm: string;
}

export type CountryDetails = {
    countryName: string;
    countryCode: string;
    countryContinent: string;
    countryPopulation: string;
    countryDetails: Details;
}

export const CountryDetails = ()=>{

    let id: any = useParams();
    const[coutryDetails, setCountryDetails] = React.useState<CountryDetails>();


    const setPageDetails = (data: CountryDetails)=>{
        setCountryDetails(data);
    }

    const setChipBackGround = (details: CountryDetails | undefined) => {
        if(details?.countryDetails === undefined){
            return "chip-blue";
        }
        if(details.countryDetails.governmentForm.toLowerCase() === "democracy"){
            return "chip-blue";
        }
        if(details.countryDetails.governmentForm.toLowerCase() === "communist"){
            return "chip-red";
        }
        return "chip-blue";
    }
    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`http://localhost:8099/v1/country/service/get/${id.countryCode}/country/details`, requestOptions)
        .then((response)=> response.json()).then((data)=> setPageDetails(data));
    }, []);
    return(
        <div>
            <div className="title"> 
                <h1>{coutryDetails?.countryName}, {coutryDetails?.countryCode}</h1>
                <div className="title__sub-header">
                    <p className="continent">Continent: {coutryDetails?.countryContinent}</p>
                    <div className={setChipBackGround(coutryDetails)}>{coutryDetails?.countryDetails=== undefined ? "__":coutryDetails?.countryDetails.governmentForm}</div>
                </div>
            </div>
            <div className="cards">
                <div className="card">
                    <div className="card__container-header">
                        <h3>Overview</h3>
                    </div>
                    <div className="card__container-body">
                        <div className="card__container-body__left">
                            <div className = "sub-card">
                                <h5>Capital</h5>
                                <p>{coutryDetails?.countryDetails!== undefined? coutryDetails?.countryDetails.capital: "__"}</p>
                            </div> 
                            <div className = "sub-card">
                                <h5>President</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.president: "__"}</p>
                            </div>
                            <div className = "sub-card">
                                <h5>Independence Day</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.independenceDay: "__"}</p>
                            </div> 
                        </div>
                        <div className="card__container-body__right">
                        <div className = "sub-card">
                                <h5>No. of States</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.noOfStates: "__"}</p>
                            </div> 
                            <div className = "sub-card">
                                <h5>Official Language</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.officialLanguage: "__"}</p>
                            </div>
                            <div className = "sub-card">
                                <h5>Independence Year</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.independenceYear: "__"}</p>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card__container-header">
                        <h3>National Symbols</h3>
                    </div>
                    <div className="card__container-body">
                        <div className="card__container-body__left">
                            <div className = "sub-card">
                                <h5>National Animal</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalAnimal:"__"}</p>
                            </div> 
                            <div className = "sub-card">
                                <h5>National Bird</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalBird:"__"}</p>
                            </div>
                            <div className = "sub-card">
                                <h5>National Sport</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalSport:"__"}</p>
                            </div> 
                        </div>
                        <div className="card__container-body__right">
                        <div className = "sub-card">
                                <h5>National Anthem</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalAnthem:"__"}</p>
                            </div> 
                            <div className = "sub-card">
                                <h5>National Higest Award</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalAward:"__"}</p>
                            </div> 
                            <div className = "sub-card">
                                <h5>Currency</h5>
                                <p>{coutryDetails?.countryDetails? coutryDetails?.countryDetails.nationalCurrency:"__"}</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}