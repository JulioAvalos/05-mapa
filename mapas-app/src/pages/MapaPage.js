import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

import { useMapBox } from "../hooks/useMapBox";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {
    
  const { setRef, coords, nuevoMarcador$, movimientoMarcador$ } = useMapBox(puntoInicial);

  useEffect(() => {
    nuevoMarcador$.subscribe(marcador => {
      // console.log('nuevo marcador -> ', marcador);
    })  
  }, [nuevoMarcador$]);

  useEffect(() => {
    movimientoMarcador$.subscribe(marcador => {
      // console.log('movimiento marcador', marcador);
    })
  }, [movimientoMarcador$]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"/>
    </>
  );
};
