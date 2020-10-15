import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { CountriesContext } from '../context/CountriesContext'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


const Map = () => {
    const [country, setCountry] = useState()
    const [isClickedAgain, setIsClickedAgain] = useState(false)

    const { fetchData, countries } = useContext(CountriesContext)


    useEffect(() => {
        if (countries.findIndex(ctry => ctry.country === country) === -1 && !isClickedAgain) {
            if (country) fetchData(country)
            setCountry()
        } else {
            alert('Already in the list')
            setCountry()
        }
    }, [country])


    useLayoutEffect(() => {
        const map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldLow;
        map.projection = new am4maps.projections.NaturalEarth1();
        map.homeZoomLevel = 2
        map.homeGeoPoint = {
            latitude: 44,
            longitude: -5
        };
        map.zoomControl = new am4maps.ZoomControl();

        const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ", "GL", 'PS'];

        const polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#CB0000");
        polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
        polygonTemplate.propertyFields.fill = "fill";

        const hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#F05C5C");

        polygonTemplate.events.on("hit", function (ev) {
            let mapCountry = ev.target.dataItem.dataContext.name

            if (mapCountry === 'United States') {mapCountry = 'US'}
            if( mapCountry === 'South Korea') {mapCountry = 'Korea, South'}

            setCountry(prevCountry => {
                if (prevCountry !== mapCountry) {
                    setIsClickedAgain(false)
                    setCountry(mapCountry)
                } else {
                    setIsClickedAgain(true)
                }
            })
        });

        const button = map.chartContainer.createChild(am4core.Button);
        button.label.text = '.'
        button.padding(5, 5, 5, 5);
        button.width = 20;
        button.align = "right";
        button.marginRight = 12;
        button.events.on("hit", () => map.goHome());

        return () => map.dispose()
    }, [])


    return (
        <div id="chartdiv"></div>
    );
}

export default Map
