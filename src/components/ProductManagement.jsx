import React from 'react';
import FormComponent from './FormComponent';
import ProductItem from './ProductItem';
import { ArticleProvider } from '../context/ArticleContext';

const ProductManagement = () => {
  return (
    <ArticleProvider>
      <div className="container mx-auto p-4">
        
        <FormComponent />
      </div>
    </ArticleProvider>
  );
};

export default ProductManagement;