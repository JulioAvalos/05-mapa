import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;

const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5,
};

export const MapaPage = () => {
  const mapaDiv = useRef();
  const [mapa, setMapa] = useState();
  const [coords, setCoords] = useState(puntoInicial);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    setMapa(map);
  }, []);

  //cuando se mueve el mapa
  useEffect(() => {

      mapa?.on('move', () => {
          const { lng, lat } = mapa.getCenter(); 
          console.log(lng, lat);
          setCoords({
              lng: lng.toFixed(4),
              lat: lat.toFixed(4),
              zoom: mapa.getZoom().toFixed(2)
          });
      });
      
    //en caso de que se destruya el mapa al desmontar el componente
    //   return () => mapa?.off('move');
  },[mapa])

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={mapaDiv} className="mapContainer"></div>
    </>
  );
};
