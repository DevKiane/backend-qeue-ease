module.exports = () => {
    const characters = '0123456789';
    return Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  };