import "./widget.css";
import { escapeHtml } from "../shared/html.js";
import { findPendingWidgets, markWidgetInitialized, renderWidgetState } from "../shared/widgets.js";

const DEFAULT_CURRENCY = "EUR";
const DEFAULT_TITLE = "Sostienici";
const FREE_AMOUNT_LABEL = "Altro importo";

function parseHttpsUrl(raw) {
  const value = raw?.trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

// Formato: "10:https://pay.sumup.com/...,25:https://pay.sumup.com/..."
function parseLinks(raw) {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((entry) => {
      const separatorIndex = entry.indexOf(":");

      if (separatorIndex === -1) {
        return null;
      }

      const amount = Number.parseFloat(entry.slice(0, separatorIndex).trim());
      const url = parseHttpsUrl(entry.slice(separatorIndex + 1));

      return Number.isFinite(amount) && amount > 0 && url ? { amount, url } : null;
    })
    .filter(Boolean);
}

function formatAmountLabel(amount, currency) {
  try {
    return new Intl.NumberFormat("it-IT", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

function readConfig(element) {
  const currency = element.dataset.donationCurrency?.trim() || DEFAULT_CURRENCY;
  const freeAmountUrl = parseHttpsUrl(element.dataset.donationUrl);
  const options = parseLinks(element.dataset.donationLinks).map(({ amount, url }) => ({
    label: formatAmountLabel(amount, currency),
    url
  }));

  if (freeAmountUrl && options.length > 0) {
    options.push({ label: FREE_AMOUNT_LABEL, url: freeAmountUrl });
  }

  const defaultUrl = options[0]?.url ?? freeAmountUrl;

  if (!defaultUrl) {
    return null;
  }

  return {
    options,
    defaultUrl,
    title: element.dataset.donationTitle?.trim() || DEFAULT_TITLE,
    subtitle: element.dataset.donationSubtitle?.trim() || ""
  };
}

function renderDonation(element, config) {
  element.dataset.state = "ready";
  element.innerHTML = `
    <section class="dw-shell" aria-label="${escapeHtml(config.title)}">
      <header class="dw-header">
        <p class="dw-kicker">Donazione</p>
        <h4 class="dw-title">${escapeHtml(config.title)}</h4>
        ${config.subtitle ? `<p class="dw-subtitle">${escapeHtml(config.subtitle)}</p>` : ""}
      </header>

      <div class="dw-form">
        ${config.options.length > 0 ? `
          <div class="dw-amounts" role="group" aria-label="Importo donazione">
            ${config.options.map((option, index) => `
              <button type="button" class="dw-amount-btn" data-url="${escapeHtml(option.url)}" aria-pressed="${index === 0}">${escapeHtml(option.label)}</button>
            `).join("")}
          </div>
        ` : ""}

        <a class="dw-submit" href="${escapeHtml(config.defaultUrl)}" target="_blank" rel="noopener">Dona con SumUp</a>
      </div>
    </section>
  `;

  const submitLink = element.querySelector(".dw-submit");
  const amountButtons = [...element.querySelectorAll(".dw-amount-btn")];

  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      submitLink.href = button.dataset.url;
      amountButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
    });
  });
}

export function initDonationWidgets(root = document) {
  const elements = findPendingWidgets(root, ".donation-widget", "dwInitialized");

  if (elements.length === 0) {
    return;
  }

  for (const element of elements) {
    markWidgetInitialized(element, "dwInitialized");

    const config = readConfig(element);

    if (!config) {
      renderWidgetState(element, "Donation widget: manca un link di pagamento SumUp valido (data-donation-url o data-donation-links).", "error");
      continue;
    }

    renderDonation(element, config);
  }
}

if (typeof window !== "undefined") {
  window.DonationWidget = {
    init: initDonationWidgets
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initDonationWidgets();
    }, { once: true });
  } else {
    initDonationWidgets();
  }
}
