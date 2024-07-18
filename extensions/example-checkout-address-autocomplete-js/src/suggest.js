import { extension } from "@shopify/ui-extensions/checkout";

// [START address-autocomplete.ext-target]
// [START address-autocomplete.extension]
export default extension(
  "purchase.address-autocomplete.suggest",
// [END address-autocomplete.ext-target]
// [START address-autocomplete.attributes]
  async ({ signal, target }) => {
    const { field, value } = target;
// [END address-autocomplete.attributes]
    const response = await fetchSuggestions(field, value, signal);

    const { result } = await response.json();
// [START address-autocomplete.suggestions]
    const suggestions = result.suggestions.map((suggestion) => {
      return {
        id: suggestion.global_address_key,
        label: suggestion.text,
        matchedSubstrings: suggestion.matched,
        formattedAddress: suggestion.formattedAddress,
      };
    });

    return { suggestions };
// [END address-autocomplete.suggestions]
  }
);

/**
 * In this example, suggestions are fetched from a static file. In your implementation,
 * use the address field and its current query value to fetch meaningful address suggestions.
 */
async function fetchSuggestions(_field, _value, signal) {
  return fetch(
    `https://shopify.github.io/address-autocomplete/address-autocomplete.json`,
    {
      // Pass `signal` to each fetch request
      signal,
    }
  );
}
// [END address-autocomplete.extension]
