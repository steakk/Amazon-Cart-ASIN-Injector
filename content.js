// Utility: Extract ASIN from Amazon product URL
function extractASIN(url) {
  const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (asinMatch) return asinMatch[1];
  try {
    const params = new URL(url).searchParams;
    if (params.has('ASIN')) return params.get('ASIN');
    if (params.has('asin')) return params.get('asin');
  } catch {
    // Ignore malformed URLs
  }
  return null;
}

// Utility: Wait for active cart items to appear in DOM
function waitForCartItems() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const activeCart = document.getElementById('sc-active-cart');
      const cartItems = activeCart ? activeCart.querySelectorAll('.sc-list-item') : [];
      if (cartItems.length > 0) {
        clearInterval(interval);
        resolve(cartItems);
      }
    }, 500);
    setTimeout(() => {
      clearInterval(interval);
      resolve([]);
    }, 10000);
  });
}

// Utility: Shorten text with ellipsis
function shorten(text, maxLen = 100) {
  if (!text) return '';
  return text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;
}

// Inject ASIN inline span next to price block
function injectASINs(cartItems) {
  cartItems.forEach((item) => {
    const link = item.querySelector('a.sc-product-link, a.a-link-normal');
    if (!link) return;

    const asin = extractASIN(link.href);
    if (!asin) return;

    const priceBlock = item.querySelector('.sc-item-price-block');
    if (!priceBlock) return;

    if (priceBlock.querySelector('.asin-injected')) return;

    const asinElem = document.createElement('span');
    asinElem.className = 'asin-injected';
    asinElem.textContent = `ASIN: ${asin}`;
    asinElem.style.fontSize = '12px';
    asinElem.style.color = '#555';
    asinElem.style.marginLeft = '8px';
    asinElem.style.whiteSpace = 'nowrap';

    priceBlock.appendChild(asinElem);
  });
}

function addSummaryAboveCart() {
  const cartColumn = document.getElementById('sc-cart-column');
  if (!cartColumn) return;

  const oldContainer = document.getElementById('cart-summary-container');
  if (oldContainer) oldContainer.remove();

  const activeCart = document.getElementById('sc-active-cart');
  const cartItems = activeCart ? activeCart.querySelectorAll('.sc-list-item') : [];

  if (cartItems.length === 0) return;

  // --- CHANGE: All inline style="..." attributes have been removed ---
  let tableHTML = `<table><tbody>`;

  cartItems.forEach(item => {
    const qtyElem = item.querySelector('input.quantity-text-input[name="quantityPickerTextInput"]');
    const quantity = qtyElem ? qtyElem.value : '';

    const link = item.querySelector('a.sc-product-link, a.a-link-normal');
    let asin = '';
    let desc = '';
    if (link) {
      asin = extractASIN(link.href) || '';
      desc = link.getAttribute('title') || link.textContent;
      desc = desc.trim().replace(/\s+/g, ' ');
      desc = desc.replace(/Opens in a new tab\.?$/i, '').trim();
      desc = shorten(desc, 100);
    }

    const amazonText = 'Amazon';
    const nText = 'N';

    const priceElem = item.querySelector('.sc-price, .sc-product-price');
    const costPer = priceElem ? priceElem.textContent.trim() : '';

    // The HTML is now completely unstyled, using colspan for structure only.
    tableHTML += `
      <tr>
        <td>${quantity}</td>
        <td>${asin}</td>
        <td colspan="3"></td>
        <!-- <td colspan="3">${desc}</td> -->
        <td>${amazonText}</td>
        <td>${nText}</td>
        <td>${costPer}</td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;

  const container = document.createElement('div');
  container.id = 'cart-summary-container';
  container.style.maxWidth = 'calc(100% - 360px)';
  container.style.width = '100%';
  container.style.margin = '0 20px 10px 0';
  container.style.border = '1px solid #ccc'; // A simple border for the container
  container.style.maxHeight = '440px';
  container.style.overflowY = 'auto';

  container.innerHTML = tableHTML;

  cartColumn.parentNode.insertBefore(container, cartColumn);
}


// Update the listener to call the new function
let updateTimeout;
function setupQuantityListener() {
  const activeCart = document.getElementById('sc-active-cart');
  if (!activeCart) return;

  activeCart.addEventListener('input', (e) => {
    if (e.target && e.target.matches('input.quantity-text-input[name="quantityPickerTextInput"]')) {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        // No need to remove an old element now, the function handles it
        addSummaryAboveCart();
      }, 300);
    }
  });
}

function setupQuantityListener() {
  const activeCart = document.getElementById('sc-active-cart');
  if (!activeCart) return;

  activeCart.addEventListener('input', (e) => {
    if (e.target && e.target.matches('input.quantity-text-input[name="quantityPickerTextInput"]')) {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        const oldSummary = document.getElementById('cart-summary-list');
        if (oldSummary) oldSummary.remove();
        addSummaryAboveCart();
      }, 300);
    }
  });
}

// Main execution
waitForCartItems().then(cartItems => {
  injectASINs(cartItems);
  addSummaryAboveCart();
  setupQuantityListener();
});
