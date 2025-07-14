// src/scripts/utils.js

export function exportToCSV(data) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(key => `"${obj[key] || ''}"`).join(","));
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `report_${new Date().toISOString()}.csv`;
  a.click();
}
