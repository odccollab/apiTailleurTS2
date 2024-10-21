const extractUrlImg = (text) => {
    const regex = /(https?:\/\/[^\s]+\.png|jpg|jpeg)/g; // Expression régulière pour trouver une URL d'image
    const match = text.match(regex);
    return match ? match[0] : '/default-avatar.jpg'; // Retourne l'URL trouvée ou une image par défaut
  };
  
 
  
  export default extractUrlImg;