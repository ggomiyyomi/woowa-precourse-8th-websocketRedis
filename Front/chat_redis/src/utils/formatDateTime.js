export function formatDateTime(isoString) {
  if (!isoString) return "";

  const d = new Date(isoString);

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${year}.${month}.${day} ${ampm} ${hour12}:${minutes}`;
}
