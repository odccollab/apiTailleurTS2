const extractUrlImg = (text) => {
  const regex = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg))/g; // Expression régulière corrigée pour prendre en compte plusieurs extensions
  const match = text.match(regex);
  return match ? match[0] : '/default-avatar.jpg'; // Retourne l'URL trouvée ou une image par défaut
};

export default extractUrlImg;
