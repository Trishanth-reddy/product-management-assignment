import { Request, Response } from 'express';
import { getProductsService } from '../services/product.service';
import { Product } from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const query = {
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      cursor: req.query.cursor as string,
      search: req.query.search as string
    };

    const result = await getProductsService(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};