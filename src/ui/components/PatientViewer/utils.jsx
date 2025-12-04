import React from 'react';

export const SPACER = { title: '', versions: '*', getter: () => '' };

export const round = function (num, digits) {
  return Number.parseFloat(num).toFixed(digits);
};

export const obsValue = (entry) => {
  if (entry == null) {
    return '';
  } else if (entry.valueQuantity) {
    return round(entry.valueQuantity.value, 2) + ' ' + entry.valueQuantity.code;
  } else if (entry.valueCodeableConcept) {
    return entry.valueCodeableConcept.coding[0].display;
  } else if (entry.valueString) {
    return entry.valueString;
  }

  if (entry.code.coding[0].code === '85354-9') {
    if (!entry.component[0].valueQuantity) {
      return ''; // WTF!!
    }

    const v1 = Number.parseFloat(entry.component[0].valueQuantity.value);
    const v2 = Number.parseFloat(entry.component[1].valueQuantity.value);

    const s1 = v1.toFixed(0);
    const s2 = v2.toFixed(0);

    if (v1 > v2) {
      return s1 + ' / ' + s2 + ' mmHg';
    } else {
      return s2 + ' / ' + s1 + ' mmHg';
    }
  }

  return '';
};

export const isMatchingReference = (entry, reference, resourceType) => {
  return (
    entry.id === reference ||
    'urn:uuid:' + entry.id === reference ||
    resourceType + '/' + entry.id === reference
  );
};

function convertHtmlToText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.innerText || doc.body.textContent || '';
}

export const getNoteText = (resource) => {
  let decoded_note = '';
  if (resource && resource['content'] && resource['content'][0]) {
    decoded_note = atob(resource['content'][0]['attachment']['data']);
  } else if (resource && resource['data']) {
    decoded_note = atob(resource['data']);
  } else {
    return '';
  }

  // Sniff-test for HTML content
  if (decoded_note.includes('</div>')) {
    return convertHtmlToText(decoded_note);
  } else {
    return decoded_note;
  }
};

export const extractMedia = (m) => {
  if (!m || !m.content) return undefined;

  const contentType = m.content.contentType;
  const data = m.content.data;
  const url = `data:${contentType};base64, ${data}`;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {' '}
      <img src={url} className="imagemedia" title="Click to open full-size" />{' '}
    </a>
  );
};
