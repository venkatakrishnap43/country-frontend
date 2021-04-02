import React from "react";
import {  BrowserRouter, Switch, Route } from "react-router-dom";
import { CountryInfo } from "../Country/CountryInfo";
import { CountryDetails } from "../CountryDeatils/CountryDetails";

export const Routering = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/country/details/:countryName/country/:countryCode/code" >
                    <CountryDetails />
                </Route>
                <Route path="/" >
                    <CountryInfo />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}