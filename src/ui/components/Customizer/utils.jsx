export const saveFile = async (content, filename) => {
  // from: https://stackoverflow.com/a/66079045
  const a = document.createElement('a');
  a.download = filename;
  const blob = new Blob([content], { type: 'text/plain' });
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};