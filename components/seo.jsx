import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <link rel="icon" href="/assets/logomain.png" />
      <link
        rel="shortcut icon"
        href="/assets/logomain.png"
        type="image/x-icon"
      />
      {/* <meta name="theme-color" content="purple" /> */}
      {/* <link rel="canonical" href="https://www.gadifor.me" /> */}
      <meta property="og:url" content="https://www.gadifor.me" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/assets/logomain.png" />
      <meta
        name="description"
        content="GadiForMe - India's Leading Cabs &amp; Private Car Provider. Become Our Partner &amp; Earn at Scale."
      />
      <meta
        property="og:description"
        name="description"
        content="GadiForMe - India's Leading Cabs &amp; Private Car Provider. Become Our Partner &amp; Earn at Scale."
      />
      <meta name="lang" content="en" />
      <meta
        name="keywords"
        content="GadiForMe, Gadiforme, www.gadifor.me, gadifor.me, partner.gadifor.me, Gadiforme Partner, Partner."
      />
    </Head>
  );
};

export default Seo;
