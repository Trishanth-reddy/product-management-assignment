import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import { IProduct, IPaginatedResponse } from '@/types';
import styles from '@/styles/Home.module.css'; // Import the CSS Module

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:5001/api/products?limit=10');
    const initialData = await res.json();
    return { props: { initialData } };
  } catch (error) {
    return { props: { initialData: null } };
  }
};

interface Props {
  initialData: IPaginatedResponse | null;
}

export default function Home({ initialData }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: null, 
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialData: initialData ? { pages: [initialData], pageParams: [null] } : undefined,
  });

  if (status === 'error') return <div style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>Error loading products.</div>;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Management</h1>
        <Link href="/add-product">
          <button className={styles.addButton}>+ Add Product</button>
        </Link>
      </div>

      <div className={styles.grid}>
        {data?.pages.map((group) => (
          group.data.map((product: IProduct) => (
            <div key={product._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.productName}>{product.name}</h2>
                <span className={styles.category}>{product.category}</span>
              </div>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.stock}>Stock: {product.stock}</span>
              </div>
            </div>
          ))
        ))}
      </div>

      <div className={styles.loadMoreContainer}>
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMoreBtn}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Products'}
          </button>
        ) : (
          <p style={{color: '#6c757d', fontStyle: 'italic'}}>No more products to load.</p>
        )}
      </div>
    </main>
  );
}