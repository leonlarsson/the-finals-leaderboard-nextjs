import Head from "next/head";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>THE FINALS - Unofficial Beta Leaderboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />;
        </>
    );
};

export default App;