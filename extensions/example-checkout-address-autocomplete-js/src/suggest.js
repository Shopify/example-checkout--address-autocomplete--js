import { extension } from "@shopify/ui-extensions/checkout";

export default extension(
  "purchase.address-autocomplete.suggest",
  async ({ signal, target }) => {
    const { field, value } = target;

    const response = await fetch(
      `https://hheyhhay.github.io/address-autocomplete/address-autocomplete.json?query=${value}&field=${signal}`,
      {
        signal,
      }
    );

    const { result } = await response.json();

    const suggestions = result.suggestions.map((suggestion) => {
      return {
        id: suggestion.global_address_key,
        label: suggestion.text,
        matchedSubstrings: suggestion.matched,
        formattedAddress: suggestion.formattedAddress,
      };
    });

    return { suggestions };
  }
);
