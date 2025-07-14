const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

function isDuplicateContact(name, phone) {
  const contacts = contactList.querySelectorAll('.contact-item');
  for (const contact of contacts) {
    const existingName = contact.querySelector('.name').textContent.trim().toLowerCase();
    const existingPhone = contact.querySelector('.phone').textContent.trim();

    if (existingName === name.toLowerCase()) {
      alert('This name is already registered!!');
      return true;
    }
    if (existingPhone === phone) {
      alert('This phone number is already registered!');
      return true;
    }
  }
  return false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !phone) return;

  if (isDuplicateContact(name, phone)) {
    return;
  }

  const contactItem = document.createElement('div');
  contactItem.classList.add('contact-item');

  contactItem.innerHTML = `
    <div class="contact-info">
      <span class="name">${name}</span>
      <span class="phone">${phone}</span>
    </div>
    <button class="btn-delete" aria-label="Delete ${name} contact">×</button>
  `;

  contactList.appendChild(contactItem);

  contactItem.querySelector('.btn-delete').addEventListener('click', () => {
    contactItem.remove();
  });

  form.reset();
  form.name.focus();
});

document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('.contact-item').remove();
  });
});
