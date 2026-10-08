const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); menu.textContent = open ? (document.documentElement.lang.startsWith('zh') ? '关闭' : 'Close') : (document.documentElement.lang.startsWith('zh') ? '菜单' : 'Menu'); });
nav?.addEventListener('click', event => { if (event.target.closest('a')) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.textContent = document.documentElement.lang.startsWith('zh') ? '菜单' : 'Menu'; } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.textContent = document.documentElement.lang.startsWith('zh') ? '菜单' : 'Menu'; menu.focus(); } });
const isChinese = document.documentElement.lang.startsWith('zh');
const enquiryForm = document.querySelector('#enquiry-form');
for (const link of document.querySelectorAll('[data-enquiry-mode], [data-enquiry-area]')) {
  link.addEventListener('click', () => {
    if (!enquiryForm) return;
    const field = link.dataset.enquiryMode ? 'mode' : 'area';
    const value = link.dataset.enquiryMode || link.dataset.enquiryArea;
    enquiryForm.elements.namedItem(field).value = value;
    const status = document.querySelector('#enquiry-selection-status');
    if (status) {
      status.textContent = `${field === 'mode' ? 'Session preference' : 'Support area'}: ${value}. You can change this below.`;
      status.hidden = false;
    }
  });
}
enquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const message = isChinese ? `您好，我想询问心理服务。\n\n姓名：${values.get('name')}\n联系方式：${values.get('contact')}\n咨询方式：${values.get('mode')}\n支持范围：${values.get('area')}\n\n${String(values.get('message') || '').trim()}` : `Hello, I'd like to enquire about an appointment.\n\nName: ${values.get('name')}\nContact: ${values.get('contact')}\nSession preference: ${values.get('mode')}\nSupport area: ${values.get('area')}\n\n${String(values.get('message') || '').trim()}`;
  const channel = event.submitter?.value || 'whatsapp';
  const destination = channel === 'email'
    ? `mailto:hello@sidebypsych.com?subject=${encodeURIComponent('Side by Psych enquiry')}&body=${encodeURIComponent(message.trim())}`
    : `https://wa.me/601111123703?text=${encodeURIComponent(message.trim())}`;
  window.location.href = destination;
});
