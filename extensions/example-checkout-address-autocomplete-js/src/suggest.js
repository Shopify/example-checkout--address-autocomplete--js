import {extension} from '@shopify/ui-extensions/checkout';

export default extension(
  'purchase.address-autocomplete.suggest',
  async (  {target,
    localization,
    signal,
  }) => {

    const response = await fetchSuggestions(signal);
    const suggestions = await buildSuggestions(response);
    return {suggestions}
});



async function fetchSuggestions( signal ) {
  return fetch(
    `https://hheyhhay.github.io/address-autocomplete/address-autocomplete.json`,
    {
      signal
    },
  );
};

async function buildSuggestions(response ) {
  const { result: { suggestions } } = await response.json();

  if (suggestions) {
    return suggestions.map((suggestion) => {
      return {
        id: suggestion.global_address_key,
        label: suggestion.text,
        matchedSubstrings: suggestion.matched,
        formattedAddress: suggestion.formattedAddress
      }
    });
  } else {
    return [];
  }
}
