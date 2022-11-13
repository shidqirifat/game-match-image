const generateRandomNum = () => Math.floor(Math.random() * 8) + 1;

const generateItem = () => {
  const uuid = generateRandomNum();

  return {
    uuid,
    image: `/assets/${uuid}.jpeg`
  };
};

const checkDuplicatedItem = (items) => {
  const listBefore = items.map((item) => item.uuid);
  listBefore.pop();

  return !!listBefore.find((item) => item === items[items.length - 1].uuid);
};

const duplicatItems = (items) => {
  const duplicatedRandomImages = [...items, ...items];

  duplicatedRandomImages.sort(() => 0.5 - Math.random());
  return duplicatedRandomImages.map((image, index) => ({ ...image, id: index }));
};

export const GENERATE_RANDOM_IMAGES = (count) => {
  const randomImages = [];
  for (let i = 0; i < count; i++) {
    randomImages.push(generateItem());
    while (checkDuplicatedItem(randomImages)) {
      randomImages.pop();
      randomImages.push(generateItem());
    }
  }

  return duplicatItems(randomImages);
};
