import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function DetailProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  console.log({id})
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/products/detail/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Dependency array includes id to refetch if it changes

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle case where no product is found
  if (!product) {
    return <div>No product found</div>;
  }

  // Render the product details
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Page Title */}
        <div className="col-md-12 text-center mb-4">
          <h1>Detail sản phẩm</h1>
        </div>
      </div>
      
      <div className="row">
        {/* Product Thumbnail */}
        <div className="col-md-6">
          <div className="card">
            <img src={product.thumbnail} alt="Product Image" className="card-img-top img-fluid" />
            <div className="card-body text-center">
              <h5 className="card-title">Ảnh sản phẩm</h5>
            </div>
          </div>
        </div>
        
        {/* Product Information */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* Title */}
              <div className="mb-3">
                <label className="fw-bold">Tiêu đề:</label>
                <p>{product.title}</p>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="fw-bold">Mô tả:</label>
                <p>{product.description}</p>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="fw-bold">Giá:</label>
                <p>{product.price} VND</p>
              </div>

              {/* Discount Percentage */}
              <div className="mb-3">
                <label className="fw-bold">Phần trăm giảm giá:</label>
                <p>{product.discountPercentage}%</p>
              </div>

              {/* Stock */}
              <div className="mb-3">
                <label className="fw-bold">Số lượng trong kho:</label>
                <p>{product.stock}</p>
              </div>

              {/* Position */}
              <div className="mb-3">
                <label className="fw-bold">Vị trí:</label>
                <p>{product.position}</p>
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="fw-bold">Trạng thái:</label>
                <p>{product.status === "active" ? "Hoạt động" : "Dừng hoạt động"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <Link to="/admin/products">
            <button className="btn btn-secondary btn-lg">Quay lại</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
