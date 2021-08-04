import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

import { useMapBox } from "../hooks/useMapBox";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {

    
  const { setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador } = useMapBox(puntoInicial);
  const { socket } = useContext(SocketContext);

  // Escuchar los marcadores existentes
  useEffect(() => {
    socket.on('marcadores-activos', (marcadores) => {
      for(const key of Object.keys(marcadores)) {
        agregarMarcador(marcadores[key], key);
      }
    })
  }, [agregarMarcador, socket])

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
