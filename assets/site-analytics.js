(() => {
  const script = document.currentScript;
  const measurementId = script?.dataset.measurementId || "";
  const consentKey = "sbp_analytics_consent";
  const isMandarin = document.documentElement.lang.toLowerCase().startsWith("zh");

  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  const labels = isMandarin
    ? {
        title: "网站分析由您决定",
        body: "同意后，我们只会记录页面浏览、语言切换与联系按钮点击，不会记录您填写的姓名、联络资料、询问内容或临床资料。",
        allow: "允许网站分析",
        decline: "暂不允许",
        privacy: "隐私说明"
      }
    : {
        title: "Website analytics are your choice",
        body: "If allowed, we record only page views, language switches and contact-button clicks. We do not record names, contact details, enquiry text or clinical information.",
        allow: "Allow analytics",
        decline: "No thanks",
        privacy: "Privacy notice"
      };

  const deleteAnalyticsCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) {
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
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      anonymize_ip: true,
      cookie_flags: "SameSite=Lax;Secure"
    });

    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(tag);
  };

  const recordEvent = (name, parameters = {}) => {
    if (localStorage.getItem(consentKey) !== "granted" || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      page_language: isMandarin ? "zh-Hans-MY" : "en-MY",
      page_path: window.location.pathname,
      ...parameters
    });
  };

  const bindEvents = () => {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (href.includes("wa.me/")) {
        recordEvent("contact_click", { contact_channel: "whatsapp" });
      } else if (href.startsWith("mailto:")) {
        recordEvent("contact_click", { contact_channel: "email" });
      } else if (href.startsWith("tel:")) {
        recordEvent("contact_click", { contact_channel: "phone" });
      }

      if (link.hasAttribute("hreflang") || link.classList.contains("language-link")) {
        recordEvent("language_switch", {
          destination_language: href.includes("mandarin") ? "zh-Hans-MY" : "en-MY"
        });
      }
    });

    document.addEventListener("submit", (event) => {
      if (event.target?.id !== "enquiryForm") return;
      recordEvent("enquiry_form_submit", {
        contact_channel: event.submitter?.dataset?.send === "email" ? "email" : "whatsapp"
      });
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
        <button class="analytics-consent__allow" type="button">${labels.allow}</button>
        <button class="analytics-consent__decline" type="button">${labels.decline}</button>
        <a href="/privacy.html${isMandarin ? "#zh" : ""}">${labels.privacy}</a>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector(".analytics-consent__allow").addEventListener("click", () => {
      localStorage.setItem(consentKey, "granted");
      banner.remove();
      loadAnalytics();
    });

    banner.querySelector(".analytics-consent__decline").addEventListener("click", () => {
      localStorage.setItem(consentKey, "denied");
      deleteAnalyticsCookies();
      banner.remove();
    });
  };

  document.querySelectorAll("#analyticsPreferences, .analytics-preferences").forEach((preferenceButton) => {
    preferenceButton.addEventListener("click", () => {
      localStorage.removeItem(consentKey);
      deleteAnalyticsCookies();
      window.location.reload();
    });
  });

  bindEvents();

  const consent = localStorage.getItem(consentKey);
  if (consent === "granted") {
    loadAnalytics();
  } else if (consent !== "denied") {
    showConsentBanner();
  }
})();
