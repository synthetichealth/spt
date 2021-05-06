export const API_KEY = process.env.SYNTHETICMASS_API_KEY;

const fetchJson = url => fetch(url).then(response => response.json());

export const getPatientsByCity = (city, count=10) => {
  const url = `https://syntheticmass.mitre.org/v1/fhir/Patient?address-city:exact=${city}&_count=${count}&apikey=${API_KEY}`;
  return fetchJson(url);
};

export const getPatientById = (id) => {
  const url = `https://syntheticmass.mitre.org/v1/fhir/Patient/${id}/$everything?apikey=${API_KEY}`;
  return getBundle(url);
};

const getBundle = (url, priorResults) => {
  return fetchJson(url)
    .then(result => {
      if (priorResults) {
        result.entry.push(...priorResults.entry);
        result.total = result.entry.length;
      }

      if (!result.link) return result;

      const next = result.link.find(l => l.relation === 'next');
      if (!next || !next.url) return result;

      const nextUrl = `${next.url}&apikey=${API_KEY}`;
      return getBundle(nextUrl, result);
    });
};


// TODO: untested
export const getNext = (searchResultBundle) => {
  if (!searchResultBundle.link) return null;
  const next = searchResultBundle.link.find(l => l.relation === 'next');
  if (!next) return null;
  const url = `${next.url}&apikey=${API_KEY}`
  return fetchJson(url);
}
