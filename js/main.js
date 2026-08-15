// Lead capture: submit to Web3Forms so every inquiry is emailed directly to
// hello@lesliesimonrecruiting.com. A local backup is also kept so details are
// never lost, and a clear fallback is shown if the network request fails.
// A page can have more than one lead form (the full Contact-page form plus
// the quick popup form), so every match gets wired up independently.
document.querySelectorAll('[data-lead-form]').forEach((leadForm) => {
  const status = leadForm.querySelector('[data-form-status]');
  const submitBtn = leadForm.querySelector('[type="submit"]');

  const showStatus = (msg, isError) => {
    if (!status) return;
    status.hidden = false;
    status.textContent = msg;
    status.classList.toggle('is-error', Boolean(isError));
  };

  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Local backup of the submission.
    try {
      const data = Object.fromEntries(new FormData(leadForm).entries());
      delete data.access_key;
      const leads = JSON.parse(localStorage.getItem('lst-leads') || '[]');
      leads.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem('lst-leads', JSON.stringify(leads));
    } catch (err) {
      /* localStorage may be unavailable (private mode) — not critical. */
    }

    if (submitBtn) submitBtn.disabled = true;
    showStatus('Sending…');

    try {
      const res = await fetch(leadForm.action, {
        method: 'POST',
        body: new FormData(leadForm),
        headers: { Accept: 'application/json' },
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success) {
        leadForm.reset();
        showStatus('Thank you — your message has been sent to Leslie. She’ll be in touch soon.');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      showStatus(
        'Sorry, something went wrong sending your message. ' +
        'Please email hello@lesliesimonrecruiting.com directly.',
        true
      );
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

// Contact popup: the email icon opens an overlay with a short lead form
// instead of navigating to the Contact section/page.
const contactModal = document.querySelector('[data-contact-modal]');
const contactTriggers = document.querySelectorAll('[data-contact-trigger]');

if (contactModal && contactTriggers.length) {
  const dismissEls = contactModal.querySelectorAll('[data-contact-modal-dismiss]');
  let lastFocused = null;
  let closeTimer = null;

  const openContactModal = (event) => {
    if (event) event.preventDefault();
    clearTimeout(closeTimer);
    lastFocused = document.activeElement;
    contactModal.hidden = false;
    document.body.classList.add('contact-modal-open');
    // Next frame so the transition actually runs instead of snapping open.
    requestAnimationFrame(() => contactModal.classList.add('is-open'));
    const firstField = contactModal.querySelector('input, textarea');
    if (firstField) firstField.focus();
  };

  const closeContactModal = () => {
    contactModal.classList.remove('is-open');
    document.body.classList.remove('contact-modal-open');
    closeTimer = setTimeout(() => { contactModal.hidden = true; }, 300);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  contactTriggers.forEach((trigger) => trigger.addEventListener('click', openContactModal));
  dismissEls.forEach((el) => el.addEventListener('click', closeContactModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.classList.contains('is-open')) closeContactModal();
  });

  // Close automatically once the popup form's own submission succeeds.
  const modalForm = contactModal.querySelector('[data-lead-form]');
  const modalStatus = modalForm ? modalForm.querySelector('[data-form-status]') : null;
  if (modalStatus) {
    const statusObserver = new MutationObserver(() => {
      if (!modalStatus.hidden && !modalStatus.classList.contains('is-error')) {
        setTimeout(closeContactModal, 1800);
      }
    });
    statusObserver.observe(modalStatus, { attributes: true, attributeFilter: ['hidden', 'class'] });
  }
}
