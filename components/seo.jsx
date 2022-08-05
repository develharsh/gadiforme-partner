import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/assets/logomain.png" />
      {/* <meta name="theme-color" content="purple" /> */}
      <meta
        name="description"
        content="GadiForMe - India's Leading Cabs &amp; Private Car Provider. Become Our Partner &amp; Earn at Scale."
      />
      <meta name="lang" content="en" />
      <meta
        name="keywords"
        content="GadiForMe, Gadiforme, www.gadiforme.com, gadiforme.com, partner.gadiforme.com, Gadiforme Partner, Partner."
      />
    </Head>
  );
};

export default Seo;
