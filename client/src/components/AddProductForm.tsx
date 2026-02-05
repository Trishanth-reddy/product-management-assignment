import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import styles from '@/styles/Form.module.css'; 

export default function AddProductForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'ELECTRONICS',
    stock: ''
  });

  const mutation = useMutation({
    mutationFn: (newProduct: any) => api.post('/products', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to create product.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add New Product</h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input required type="text" className={styles.input}
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Category</label>
        <select className={styles.select}
          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
          <option value="BOOKS">Books</option>
          <option value="FOOD">Food</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price ($)</label>
        <input required type="number" className={styles.input}
          value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Stock</label>
        <input required type="number" className={styles.input}
          value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea required className={styles.textarea} rows={3}
          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>

      <button type="submit" disabled={mutation.isPending} className={styles.submitBtn}>
        {mutation.isPending ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}