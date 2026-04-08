const images = import.meta.glob("../assets/food/*", { eager: true });

export const getImage = (imageName) => {
  const path = `../assets/${imageName}.png`;
  return images[path]?.default;
};
