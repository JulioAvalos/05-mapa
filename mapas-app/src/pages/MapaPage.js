import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

import { useMapBox } from "../hooks/useMapBox";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {

  const { socket } = useContext(SocketContext);
    
  const { setRef, coords, nuevoMarcador$, movimientoMarcador$ } = useMapBox(puntoInicial);

  useEffect(() => {
    nuevoMarcador$.subscribe(marcador => {
      socket.emit('marcador-nuevo', marcador);
    })  
  }, [nuevoMarcador$, socket]);

  useEffect(() => {
    movimientoMarcador$.subscribe(marcador => {
      // console.log('movimiento marcador', marcador);
    })
  }, [movimientoMarcador$]);

  // Escuchar nuevos marcadores
  useEffect(() => {
    socket.on('marcador-nuevo', (marcador) => {
      console.log(marcador);
    });
  },[socket]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"/>
    </>
  );
};
