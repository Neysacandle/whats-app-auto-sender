document.getElementById('startBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files.length) {
    alert("Please upload an Excel file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const contacts = XLSX.utils.sheet_to_json(sheet);

    chrome.storage.local.set({ contacts });
    chrome.tabs.create({ url: "https://web.whatsapp.com" });
  };
  reader.readAsArrayBuffer(fileInput.files[0]);
});
