export function getTextFromKey(obj, key) {
  if (!key) return "";
  return key.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : '', obj);
}
