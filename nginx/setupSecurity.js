const fs = require("fs");
const path = require("path");
const currentPath = path.resolve(".");

/***
 **
 ***/
const CLOUDFRONT_URL = 'https://static.launchmycareer.com/';
const S3_BUCKET_URL_STATIC = 'https://lyc-staticcontenet.s3.ap-south-1.amazonaws.com/';

let connectSrcDomains = [];
connectSrcDomains.push("'self'");
connectSrcDomains.push(CLOUDFRONT_URL);
connectSrcDomains.push("https://cognito-idp.ap-south-1.amazonaws.com");
connectSrcDomains.push("https://api.razorpay.com");

const appendCSPHeaders = () => {
    const csp = {
        defaultSrc: ["'self'", "https://admin.auth.ap-south-1.amazoncognito.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://ajax.googleapis.com", "https://admin.auth.ap-south-1.amazoncognito.com"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://pro.fontawesome.com'],
        imgSrc: ["'self'", "blob:", 'data:', S3_BUCKET_URL_STATIC, CLOUDFRONT_URL, "https://static-prod.launchmycareer.com", "https://api.razorpay.com", "https://rzp.io"],
        connectSrc: connectSrcDomains,
        fontSrc: ["'self'", "blob:", 'data:', 'https://fonts.gstatic.com', 'https://pro.fontawesome.com'],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'", "blob:", "data:", S3_BUCKET_URL_STATIC, CLOUDFRONT_URL, "https://admin.auth.ap-south-1.amazoncognito.com"],
        frameSrc: ["'self'"],
    };
    let headers = `more_set_headers "Content-Security-Policy :`;
    Object.keys(csp).forEach(cspKey => {
        headers += cspKey + " " + csp[cspKey].join(" ") + "; ";
    });
    return `${headers}";`;
}

/**
 * Setup the base.conf file with the security headers
 */
const setupSecurity = () => {
    const baseConfigTemplate = fs.readFileSync(path.join(currentPath, "nginx", "template", "basic.conf"));

    const updatedContent = baseConfigTemplate + "\n\n" + appendCSPHeaders();

    fs.writeFileSync(path.join(currentPath, "nginx", "basic.conf"), updatedContent);
}

setupSecurity();