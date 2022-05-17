import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Gallery.module.css";

function GalleryItem({ title, url }) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={url} alt={`Imagen de ${title}`} />
    </div>
  );
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async function fetchData() {
      try {
        const { status, data } = await axios.get(
          "http://localhost:3001/gallery",
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        if (status === 200) setItems(data);
      } catch (error) {
        if (error.name === "CanceledError") return; // Guardia para el abort en caso de renderizado antes de la llamada

        setLoading(false);
        console.error(error);
        setError("No se pudo cargar la galería");
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className="container">
      <h1>La Galería Secreta</h1>
      {error && <div className={styles.banner}>{error}</div>}
      {loading && <h3>Cargando...</h3>}
      <div className={styles.galleryItems}>
        {items.map(({ id, title, url }) => (
          <GalleryItem key={id} title={title} url={url} />
        ))}
      </div>
    </div>
  );
}
