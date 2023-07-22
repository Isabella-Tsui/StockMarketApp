import React, { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "1100",
      height: "523",
      defaultColumn: "overview",
      defaultScreen: "most_capitalized",
      showToolbar: true,
      locale: "en",
      market: "us",
      colorTheme: "light",
    });

    const appendScript = () => {
      const container = document.getElementById("tradingview-widget-container");

      if (container) {
        container.appendChild(script);
      }
    };

    // Check if the container element exists before appending the script
    if (document.readyState === "complete") {
      appendScript();
    } else {
      window.addEventListener("load", appendScript);
    }

    return () => {
      const container = document.getElementById("tradingview-widget-container");
      if (container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
