const portalUrl =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL;

export default portalUrl;
