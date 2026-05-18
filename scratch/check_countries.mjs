import { africanCountries } from '../utils/countryData.js';
console.log('Total:', africanCountries.length);
africanCountries.forEach((c, i) => console.log(`${i+1}. ${c.label} (${c.code})`));
