export function TransformBinaryToPdf(binary: string, fileName: string, id: string) {
   const blob = new Blob([binary], { type: "application/pdf" });
   const fileURL = window.URL.createObjectURL(blob);

   const link = document.createElement("a");
   link.href = fileURL;
   link.download = `${fileName}_${id}.pdf`;
   link.click();
}
