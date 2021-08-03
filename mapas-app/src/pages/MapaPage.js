import React from "react";

import { useMapBox } from "../hooks/useMapBox";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {
    
  const { setRef, coords } = useMapBox(puntoInicial);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"/>
    </>
  );
};
