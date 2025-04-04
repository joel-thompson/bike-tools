import { FaBicycle } from "react-icons/fa";
import { renderToString } from "react-dom/server";

export const setFaviconFromIcon = () => {
  // Render the icon to SVG string
  const svgString = renderToString(<FaBicycle style={{ color: "#4a90e2" }} />);

  // Convert SVG string to base64 data URL
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

  // Update favicon link
  const link =
    document.querySelector<HTMLLinkElement>("link[rel*='icon']") ??
    document.createElement("link");
  link.type = "image/svg+xml";
  link.rel = "icon";
  link.href = dataUrl;
  document.getElementsByTagName("head")[0].appendChild(link);
};
