import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;

export const useMapBox = (puntoInicial) => {

  // Referencia al DIV del mapa
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
      mapaDiv.current = node;
  },[]);

  // Referencia a los marcadores
  const marcadores = useRef({});

  // Observables de Rxjs
  const movimientoMarcador = useRef( new Subject());
  const nuevoMarcador = useRef( new Subject());

  // Mapa y coords
  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

  // funcion para agregar marcadores
  const agregarMarcador = useCallback( (event, id) => {

    const { lat, lng } = event.lngLat || event;

      const marker = new mapboxgl.Marker();
      marker.id = id ?? v4(); 

      marker
        .setLngLat([lng, lat])
        .addTo(mapa.current)
        .setDraggable(true);
      
      marcadores.current[ marker.id ] = marker;

      if(!id) {
        nuevoMarcador.current.next({
          id: marker.id,
          lng,
          lat
        });
      }

      // escuchar movimientos del marcador 
      marker.on('drag', (event) => {
        const { id } = event.target;
        const { lng, lat } = event.target.getLngLat();
        movimientoMarcador.current.next({ id, lng, lat }) ;
      });

  },[]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    mapa.current = map;
  }, [puntoInicial]);

  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      // console.log(lng, lat);
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
  }, []);

  // Agregar marcadores cuando se hace clic
  useEffect(() => {
    mapa.current?.on('click', agregarMarcador);
  }, [agregarMarcador]);

  return {
    agregarMarcador,
    coords,
    marcadores,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
    setRef
  };
};
