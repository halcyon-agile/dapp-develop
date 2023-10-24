const portalUrl =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_DEV_URL
    : "https://lively-geyser-q53l27l9w5bc.vapor-farm-e1.com";

export default portalUrl;
