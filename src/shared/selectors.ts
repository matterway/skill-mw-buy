export const SELECTORS = {
  amazon: {
    searchInput: 'input[id*="search"][type="text"]',
    searchButton: 'input[id*="search"][type="submit"]',
    priceInput: 'input[id*="upper-bound"][type="range"]',
    priceInputHidden: "input[name*='high-price'][type='hidden']",
    priceButton:
      'input[aria-label*="Go"][type="submit"], input[aria-label*="Start – Preisspanne einreichen"][type="submit"]',
    xResults:
      "//*[contains(text(), 'Results') and not(.//*[contains(text(), 'Results')])] | //*[contains(text(), 'Ergebnissen') and not(.//*[contains(text(), 'Ergebnissen')])]",
    xNoResults:
      "//*[contains(text(), 'No results') and not(.//*[contains(text(), 'No results')])] | //*[contains(text(), 'Keine Ergebnisse') and not(.//*[contains(text(), 'Keine Ergebnisse')])]",
  },
  ebay: {
    searchInput: 'input[aria-label*="Search"]',
    searchButton: 'button[class*="primary"]',
    priceInput: 'input[id*="endParam"][aria-label*="Max"]',
    priceButton: 'button[aria-label*="price"]',
    confirmPrice: 'button[aria-label*="price range"]',
    results: '[id*="item"]',
    xNoResults:
      "//h3[contains(text(), 'No exact matches found') and not(.//*[contains(text(), 'No exact matches found')])]",
  },
  alibaba: {
    cookieAccept: '.gdpr-agree-btn',
    searchInput: 'input',
    searchButton: 'button[aria-label*="Search"]',
    priceInput: '.filter-price-group div.pricet .left-filter-input',
    priceButton: '.filter-button.price-ok',
    results: '[class*=product-item]',
    xNoResults: "not(//*[contains(@class, 'product-item')])",
  },
};
