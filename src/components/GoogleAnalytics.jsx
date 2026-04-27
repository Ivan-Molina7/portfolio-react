import { Helmet } from 'react-helmet-async';

function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-PCXWTEXF66'; // Reemplazá con tu ID

  return (
    <Helmet>
      {/* Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
}

export default GoogleAnalytics;