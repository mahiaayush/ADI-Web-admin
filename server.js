const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const path = require("path");
const app = express();
if (process.env.NODE_ENV === "production") {
  const CLOUDFRONT_URL = process.env.REACT_APP_COGNITO_CLOUDFRONT_URL;
  const S3_BUCKET_URL_STATIC = process.env.S3_BUCKET_STATIC_URL;
  let allowDomains = process.env.CSP_DOMAIN_ALLOW.split('||');
  let connectSrcDomains = allowDomains;
  connectSrcDomains.push("'self'");   
  connectSrcDomains.push(CLOUDFRONT_URL);
  connectSrcDomains.push("https://cognito-idp.ap-south-1.amazonaws.com");
  connectSrcDomains.push("https://api.razorpay.com");

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "https://admin.auth.ap-south-1.amazoncognito.com"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://ajax.googleapis.com", "https://admin.auth.ap-south-1.amazoncognito.com"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://pro.fontawesome.com'],
          imgSrc: ["'self'", "blob:", 'data:', S3_BUCKET_URL_STATIC, CLOUDFRONT_URL,"https://static-prod.launchmycareer.com", "https://api.razorpay.com", "https://rzp.io"],
          connectSrc: connectSrcDomains,
          fontSrc: ["'self'", "blob:", 'data:', 'https://fonts.gstatic.com', 'https://pro.fontawesome.com'],
          objectSrc: ["'self'"],
          mediaSrc: ["'self'", "blob:", "data:", S3_BUCKET_URL_STATIC, CLOUDFRONT_URL, "https://admin.auth.ap-south-1.amazoncognito.com"],
          frameSrc: ["'self'"],
        },
      },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      xssFilter: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: false,
        preload: true,
      },
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );
  app.use(express.static(path.join(__dirname, 'build')));
  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  // CORS Middleware
  var allowlist = process.env.CSP_DOMAIN_ALLOW.split('||'); //['devapi.launchmycareer.com', 'devclever-india-dev-lyc-web-0-4.0de945bd.lowtouch.cloud']
  //console.log(allowlist);
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  app.use(cors(corsOptionsDelegate));
}
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});