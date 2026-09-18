export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const formatPhone = (phone) => phone.replace(/\s+/g, '');

export const scrollToSection = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);