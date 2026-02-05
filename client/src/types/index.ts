export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
}

export interface IPaginatedResponse {
  data: IProduct[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}