/* eslint-disable no-undef */
import { storeOrders } from '../../src/api/Model/Orders';
import { storeProducts, product } from '../../src/api/Model/Products';

const product: storeProducts = new storeProducts();
const order: storeOrders = new storeOrders();

describe('Product Model', () => {
  it('Get all products method is defined', () => {
    expect(product.index).toBeDefined();
  });
  it('Get product by id method is defined', () => {
    expect(product.show).toBeDefined();
  });
  it('Create product method is defined', () => {
    expect(product.create).toBeDefined();
  });
  it('Create a product ', async () => {
    const res = await product.create({
      name: 'iPhone',
      price: 150
    });
    expect(res).toEqual({
      id: 2,
        name: 'iPhone',
        price: 150
    });
  });
  it('A list of products should be returned', async () => {
    const res:product[] = await product.index();
    expect(res[0].id).toEqual(1);
    expect(res[0].name).toEqual("iPhone");
    expect(res[0].price).toEqual(150);

  });

  it('return the selected product', async () => {
    const res = await product.show("1");
    expect(res).toEqual({
      id: 1,
      name: 'iPhone',
      price: 150
    });
  });

  it('delete the selected product', async () => {
    order.delete("1")
    const res = await product.delete("1");
    console.log(res);
    expect(res).toEqual({
      id: 1,
      name: 'iPhone',
      price: 150
    });
  });
});
