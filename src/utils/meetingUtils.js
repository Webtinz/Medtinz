// utils/meetingUtils.js

// Génère un code de réunion aléatoire
export function generateMeetingCode(length = 10) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const code = Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
  return code; // Génère un code aléatoire de 10 caractères
}
// Crée un lien de réunion complet
export function generateMeetingLink(code) {
  const urlParams = new URLSearchParams(window.location.search);
  const hasChannel = urlParams.has('channel'); // Vérifie si le paramètre 'channel' est présent

  // Si 'channel' est présent, on crée le lien, sinon on peut ajouter un message d'erreur ou faire autre chose
  if (hasChannel) {
    const baseUrl = window.location.origin + window.location.pathname + '?channel='; 
    return `${baseUrl}${code}`;
  } else {
    console.error('Le paramètre "channel" est manquant dans l\'URL.');
    return null;
  }
}


export function extractMeetingCode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('channel');
}
