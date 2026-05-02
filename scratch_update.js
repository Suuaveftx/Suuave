const fs = require('fs');
const ctd = require('country-telephone-data');

const countriesData = ctd.allCountries;

const dialCodes = [];
const countryList = [];

const uniqueDialCodes = new Set();
countriesData.forEach(c => {
  const code = c.iso2.toLowerCase();
  const flagUrl = `https://flagcdn.com/w20/${code}.png`;
  // Strip non-ASCII characters (or invisible formatting characters)
  const name = c.name.replace(/[^\x20-\x7E]/g, '').trim(); 
  const idd = "+" + c.dialCode;
  
  if (!uniqueDialCodes.has(idd)) {
    uniqueDialCodes.add(idd);
    dialCodes.push({
      key: idd,
      label: idd,
      icon: flagUrl,
      code: code
    });
  }
  
  countryList.push({
    key: name,
    label: name,
    icon: flagUrl,
    code: code
  });
});

let out = 'export const countries = \\n' + JSON.stringify(countryList, null, 2) + ';\\n\\n';
out += 'export const dialCodes = \\n' + JSON.stringify(dialCodes, null, 2) + ';\\n';

// write to string
// wait, the literal \n was written as \n not an actual newline in the previous file
// 'export const countries = \n' + ... will generate valid JS code.
out = `export const countries = 
${JSON.stringify(countryList, null, 2)};

export const dialCodes = 
${JSON.stringify(dialCodes, null, 2)};
`;

fs.writeFileSync('utils/countryData.js', out);
console.log('generated clean data');
