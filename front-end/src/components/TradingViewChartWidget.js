import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewChartWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("technical-analysis-chart-demo") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          container_id: "technical-analysis-chart-demo",
          width: "100%",
          height: "100%",
          autosize: true,
          symbol: "AAPL",
          interval: "D",
          timezone: "exchange",
          theme: "light",
          style: "1",
          toolbar_bg: "#f1f3f6",
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          studies: [
            "ROC@tv-basicstudies",
            "StochasticRSI@tv-basicstudies",
            "MASimple@tv-basicstudies",
          ],
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          locale: "en",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="technical-analysis-chart-demo" />
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
}

// import React, { useEffect } from "react";
// import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

// //This is the link with the react embed
// //https://www.tradingview.com/widget/advanced-chart/

// const TradingViewWidget = () => {
//   return <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>; //   useEffect(() => {
// };

// export default TradingViewWidget;

// TradingViewWidget.jsx
