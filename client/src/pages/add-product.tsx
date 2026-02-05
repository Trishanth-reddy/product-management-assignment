import AddProductForm from '@/components/AddProductForm';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';

export default function AddProductPage() {
  return (
    <div style={{minHeight: '100vh', padding: '2rem', backgroundColor: '#f8f9fa'}}>
      <div style={{maxWidth: '500px', margin: '0 auto'}}>
        <Link href="/" className={styles.backLink}>← Back to Products</Link>
      </div>
      <AddProductForm />
    </div>
  );
}