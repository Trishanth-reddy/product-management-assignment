import { Request, Response } from 'express';
import * as ProductService from '../services/product.service';
import { HttpStatus } from '../constants/app.constants';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { limit, cursor, search, category } = req.query;

    const parsedLimit = limit ? parseInt(limit as string) : 10;
    
    const result = await ProductService.getProducts(
      parsedLimit, 
      cursor as string,
      search as string,
      category as string
    );

    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(HttpStatus.CREATED).json(product);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating product' });
  }
};