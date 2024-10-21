const extractUrlImg = (text) => {
    const regex = /(https?:\/\/[^\s]+\.png|jpg|jpeg)/g; // Expression régulière pour trouver une URL d'image
    const match = text.match(regex);
    return match ? match[0] : '/default-avatar.jpg'; // Retourne l'URL trouvée ou une image par défaut
  };
  
  // Exemple d'utilisation :
//   const notificationContent = "https://res.cloudinary.com/di50em335/image/upload/v1728755414/uploads/s4ndki0hzea6pgxlotbs.png laye laye diop vous a partager un post";
//   const imageUrl = extractImageUrl(notificationContent);
//   console.log(imageUrl); // Affichera l'URL de l'image
  
  export default extractUrlImg;