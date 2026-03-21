import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title || "Zeroomiro"}</title>

      {/* Basic SEO */}
      <meta
        name="description"
        content={description || "Best online products at best price"}
      />

      {/* Open Graph (Facebook, Messenger) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/logo.png" />
    </Helmet>
  );
};

export default SEO;