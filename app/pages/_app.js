import { PlayerProvider } from "../context/PlayerContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <Component {...pageProps} />
    </PlayerProvider>
  );
}

export default MyApp;
