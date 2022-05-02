import { ReactComponent as HackademyLogo } from "../../assets/logo.svg";

import styles from "./Blurb.module.css";

export default function Blurb() {
  return (
    <div className={styles.container}>
      <h1>Autenticación del Usuario en React</h1>
      <h2>Con protección de rutas y tokens</h2>
      <p>
        Con este repo encontrarás una simple solución a la autenticación de
        usuarios
        <br />
        implementando&nbsp;
        <a
          href="https://reactrouter.com/docs/en/v6/getting-started/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Router v6
        </a>
        , el hook de React&nbsp;
        <a
          href="https://es.reactjs.org/docs/context.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Context
        </a>
        ,&nbsp;y&nbsp;
        <a
          href="https://jwt.io/introduction"
          target="_blank"
          rel="noopener noreferrer"
        >
          JSON Web Tokens
        </a>
        .
      </p>
      <HackademyLogo width={64} height={64} />
    </div>
  );
}
