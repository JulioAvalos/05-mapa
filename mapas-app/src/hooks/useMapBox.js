import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;

export const useMapBox = (puntoInicial) => {

  // Referencia al DIV del mapa
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
      mapaDiv.current = node;
  },[]);

  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

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
      console.log(lng, lat);
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
  }, []);

  return {
    coords,
    setRef
  };
};
