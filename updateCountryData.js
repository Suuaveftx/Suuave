const fs = require('fs');
const https = require('https');

https.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const countries = JSON.parse(data);
    const getFlagEmoji = (countryCode) => {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    };

    const dialCodes = [];
    const countryList = [];

    countries.sort((a,b) => a.name.common.localeCompare(b.name.common)).forEach(country => {
      const code = country.cca2;
      const emoji = getFlagEmoji(code);
      const name = country.name.common;
      if (country.idd && country.idd.root) {
        const suffixes = country.idd.suffixes || [''];
        // we'll just take the first suffix if there are many, or just root if no suffix
        const idd = country.idd.root + (suffixes.length === 1 ? suffixes[0] : '');
        // handle cases where suffix is very long e.g., united states / canada both +1
        if (suffixes[0] === '') {
           dialCodes.push({ key: country.idd.root, label: emoji + ' ' + country.idd.root });
        } else {
           dialCodes.push({ key: idd, label: emoji + ' ' + idd });
        }
      }
      countryList.push({ key: name, label: name });
    });
    
    // sort dialcodes
    // remove duplicates
    const uniqueDialCodes = [];
    const seen = new Set();
    dialCodes.forEach(dc => {
      if (!seen.has(dc.key)) {
        seen.add(dc.key);
        uniqueDialCodes.push(dc);
      }
    });

    let out = 'export const countries = \\n' + JSON.stringify(countryList, null, 2) + ';\\n\\n';
    out += 'export const dialCodes = \\n' + JSON.stringify(uniqueDialCodes, null, 2) + ';\\n';
    fs.writeFileSync('utils/countryData.js', out);
    console.log('done');
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
