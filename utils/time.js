export const millisToTimer = ({ time, type, label = '', invisibleEmpty }) => {
  let divider = {
    minute: 60_000,
    second: 1_000
  };
  const value = Math.floor((time / divider[type]) % 60);
  if (!value && invisibleEmpty) return '';

  return `${('0' + Math.floor((time / divider[type]) % 60)).slice(-2)} ${label}`;
};
