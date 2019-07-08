export const deleteProduct = (id, arr) => {
  return arr.filter(a => a !== (arr.find(e => e.id === id)));
};

export const totalPrice = arr => arr.map(a => a.amount * a.price).reduce((a, b) => a + b, 0);