export const generatePdf = (blob: Blob, FileName: string) => {
  const filename = `${FileName}.pdf`;
  const mimeType = 'application/pdf';

  if (!blob) {
    console.error('No se proporcionó un Blob para descargar.');
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.type = mimeType;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
};
