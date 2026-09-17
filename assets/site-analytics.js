(() => {
  const script = document.currentScript;
  const measurementId = script?.dataset.measurementId || "";
  const consentKey = "sbp_measurement_consent_v2";
  const adsId = "AW-18433837593";
  const conversionDestination = `${adsId}/En91CPGlxvIcEJmU-NVE`;
  const getConsent = () => {
    try { return localStorage.getItem(consentKey); } catch { return null; }
  };
  const saveConsent = (value) => {
    try { localStorage.setItem(consentKey, value); } catch { /* Remain opted out. */ }
  };
  const isMandarin = document.documentElement.lang.toLowerCase().startsWith("zh");

  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  const labels = isMandarin
    ? {
        title: "网站分析由您决定",
        body: "您可以只允许网站分析，或同时允许 Google Ads 衡量广告带来的联系按钮点击。我们不会传送表格内容或临床资料，也不会用于个性化广告。",
        all: "允许分析与广告成效统计",
        allow: "允许网站分析",
        decline: "暂不允许",
        privacy: "隐私说明"
      }
    : {
        title: "Website analytics are your choice",
        body: "Choose analytics only, or also allow Google Ads to measure contact-button clicks from ads. We do not send form answers or clinical details, or use this for personalized ads.",
        all: "Allow analytics + ad measurement",
        allow: "Allow analytics",
        decline: "No thanks",
        privacy: "Privacy notice"
      };

  const deleteAnalyticsCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_") || name.startsWith("_gcl_")) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.sidebypsych.com; SameSite=Lax`;
      }
    });
  };

  const loadAnalytics = () => {
    if (window.sbpAnalyticsLoaded) return;
    window.sbpAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    const adsAllowed = getConsent() === "all";
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: adsAllowed ? "granted" : "denied",
      ad_user_data: adsAllowed ? "granted" : "denied",
      ad_personalization: "denied"
    });
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "allow_ad_personalization_signals", false);
    // Do not send query strings, fragments or contact-link destinations.
    window.gtag("set", "page_location", window.location.origin + window.location.pathname);
    window.gtag("set", "page_referrer", "");
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      anonymize_ip: true,
      cookie_flags: "SameSite=Lax;Secure"
    });
    if (adsAllowed) {
      window.gtag("config", adsId, {
        allow_ad_personalization_signals: false,
        allow_enhanced_conversions: false,
        send_page_view: false
      });
    }

    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(tag);
  };

  const recordEvent = (name, parameters = {}) => {
    if (!["analytics", "all"].includes(getConsent()) || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      send_to: measurementId,
      page_language: isMandarin ? "zh-Hans-MY" : "en-MY",
      page_path: window.location.pathname,
      ...parameters
    });
  };

  let lastContact = 0;
  const recordContact = (channel, eventName = "contact_click") => {
    recordEvent(eventName, { contact_channel: channel });
    if (getConsent() !== "all" || typeof window.gtag !== "function") return;
    if (lastContact && Date.now() - lastContact < 1500) return;
    lastContact = Date.now();
    window.gtag("event", "conversion", {
      send_to: conversionDestination,
      value: 0,
      currency: "MYR"
    });
  };

  const bindEvents = () => {
    document.addEventListener("click", (event) => {
      const link = event.target.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        recordContact("whatsapp");
      } else if (href.startsWith("mailto:")) {
        recordContact("email");
      } else if (href.startsWith("tel:")) {
        recordContact("phone");
      }

      if (link.hasAttribute("hreflang") || link.classList.contains("language-link")) {
        recordEvent("language_switch", {
          destination_language: href.includes("mandarin") ? "zh-Hans-MY" : "en-MY"
        });
      }
    });

    document.addEventListener("submit", (event) => {
      if (event.target?.id !== "enquiryForm") return;
      if (!event.target.checkValidity()) return;
      recordContact(event.submitter?.dataset?.send === "email" ? "email" : "whatsapp", "enquiry_form_submit");
    });
  };

  const addBannerStyles = () => {
    if (document.getElementById("analyticsConsentStyles")) return;
    const style = document.createElement("style");
    style.id = "analyticsConsentStyles";
    style.textContent = `
      .analytics-consent {
        position: fixed;
        z-index: 1000;
        right: 18px;
        bottom: 18px;
        width: min(430px, calc(100% - 36px));
        padding: 20px;
        color: #242321;
        border: 1px solid #d9d1c5;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 18px 44px rgba(35, 31, 27, 0.2);
        font: 15px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .analytics-consent strong {
        display: block;
        margin-bottom: 6px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 20px;
      }
      .analytics-consent p {
        margin: 0;
        color: #5f5b55;
      }
      .analytics-consent__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin-top: 16px;
      }
      .analytics-consent button,
      .analytics-consent a {
        min-height: 42px;
        padding: 0 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #d9d1c5;
        border-radius: 6px;
        color: #63442c;
        background: #ffffff;
        font: inherit;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }
      .analytics-consent .analytics-consent__allow {
        color: #ffffff;
        border-color: #63442c;
        background: #63442c;
      }
      .analytics-consent button:focus-visible,
      .analytics-consent a:focus-visible {
        outline: 3px solid rgba(152, 104, 59, 0.32);
        outline-offset: 2px;
      }
      @media (max-width: 520px) {
        .analytics-consent {
          right: 12px;
          bottom: 12px;
          width: calc(100% - 24px);
        }
      }
    `;
    document.head.appendChild(style);
  };

  const showConsentBanner = () => {
    addBannerStyles();
    const banner = document.createElement("aside");
    banner.className = "analytics-consent";
    banner.setAttribute("aria-label", labels.title);
    banner.innerHTML = `
      <strong>${labels.title}</strong>
      <p>${labels.body}</p>
      <div class="analytics-consent__actions">
        <button class="analytics-consent__all" type="button">${labels.all}</button>
        <button class="analytics-consent__allow" type="button">${labels.allow}</button>
        <button class="analytics-consent__decline" type="button">${labels.decline}</button>
        <a href="/privacy.html${isMandarin ? "#zh" : ""}">${labels.privacy}</a>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector(".analytics-consent__allow").addEventListener("click", () => {
      saveConsent("analytics");
      banner.remove();
      if (getConsent()) loadAnalytics();
    });

    banner.querySelector(".analytics-consent__all").addEventListener("click", () => {
      saveConsent("all");
      banner.remove();
      if (getConsent()) loadAnalytics();
    });

    banner.querySelector(".analytics-consent__decline").addEventListener("click", () => {
      saveConsent("denied");
      deleteAnalyticsCookies();
      banner.remove();
    });
  };

  const preferences = document.createElement("button");
  preferences.type = "button";
  preferences.className = "analytics-preferences";
  preferences.textContent = isMandarin ? "隐私设定" : "Privacy choices";
  preferences.style.cssText = "display:block;margin:16px auto;padding:8px 12px;background:white;color:#333;border:1px solid #999;border-radius:4px;cursor:pointer";
  document.body.appendChild(preferences);
  document.querySelectorAll("#analyticsPreferences, .analytics-preferences").forEach((preferenceButton) => {
    preferenceButton.addEventListener("click", () => {
      if (typeof window.gtag === "function") window.gtag("consent", "update", {
        analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
      });
      try { localStorage.removeItem(consentKey); } catch { /* Storage unavailable. */ }
      deleteAnalyticsCookies();
      window.location.reload();
    });
  });

  bindEvents();

  const consent = getConsent();
  if (["analytics", "all"].includes(consent)) {
    loadAnalytics();
  } else if (consent !== "denied") {
    showConsentBanner();
  }
})();
