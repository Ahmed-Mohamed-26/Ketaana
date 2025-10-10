export function getProducts(count = 40) {
  const SAMPLE_IMG = "./assets/images/products/product.png";
  const FACTORY_IMG = "./assets/images/products/factory.png";

  function randomNumber() {
    const randPart = () => Math.floor(10000 + Math.random() * 90000);
    return `${randPart()}-${randPart()}`;
  }

  function createProductObj() {
    const categories = ["اصلي", "تجاري"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      img: SAMPLE_IMG,
      detail: `تفاصيل المنتج ${Math.floor(Math.random() * 100)}`,
      number: randomNumber(),
      offer: Math.random() > 0.5,
      category,
      factoryImg: FACTORY_IMG,
      evaluation: (Math.random() * 5).toFixed(1),
      price: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
    };
  }

  const products = [];
  for (let i = 0; i < count; i++) products.push(createProductObj());
  return products;
}
