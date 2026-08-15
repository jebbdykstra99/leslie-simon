// Lead capture: submit to Web3Forms so every inquiry is emailed directly to
// hello@lesliesimonrecruiting.com. A local backup is also kept so details are
// never lost, and a clear fallback is shown if the network request fails.
const leadForm = document.querySelector('[data-lead-form]');

if (leadForm) {
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
}
