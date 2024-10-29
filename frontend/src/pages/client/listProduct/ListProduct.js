import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { get } from "../../../Helpers/API.helper";
import "./ListProduct.css"; // Adjust the path if needed
import { FiTag } from "react-icons/fi";

const ListProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
  const [selectedChildCategory, setSelectedChildCategory] = useState(""); // New state for selected child category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get("http://localhost:5000/products"); // Update with your actual products API endpoint
        console.log(data);
        setProducts(data.products);
        setCategories(data.layoutProductsCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const getChildCategoryIds = (parentId) => {
    const parentCategory = categories.find(
      (category) => category._id === parentId
    );
    if (parentCategory && parentCategory.children) {
      return parentCategory.children.map((child) => child._id);
    }
    return [];
  };

  const filteredProducts = selectedChildCategory
    ? products.filter(
        (product) => product.product_category_id === selectedChildCategory
      )
    : selectedCategory
    ? products.filter((product) =>
        [selectedCategory, ...getChildCategoryIds(selectedCategory)].includes(
          product.product_category_id
        )
      )
    : products;

  // Helper function to get child category IDs for a selected parent

  const handleParentCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedChildCategory("");
  };

  const handleChildCategoryClick = (childId) => {
    setSelectedChildCategory(childId);
  };

  console.log(selectedCategory);
  console.log(selectedChildCategory);
  return (
    <div className="main-layout">
      <Row>
        <Col md={4} lg={2} className="category-sidebar">
          <h5>Danh mục</h5>
          <ul>
            <h5
              onClick={() => {
                setSelectedCategory("");
                setSelectedChildCategory("");
              }}
              style={{
                cursor: "pointer",
                color:
                  selectedCategory === "" && selectedChildCategory === ""
                    ? "blue"
                    : "black",
              }}
            >
               <FiTag style={{ marginRight: "5px" }} /> {/* Icon for "All Products" */}
              All Products
            </h5>
            {categories.map((category) => (
              <li
                key={category._id}
                onClick={() => handleParentCategoryClick(category._id)}
              >
                <h4
                  style={{
                    cursor: "pointer",
                    color: selectedCategory === category._id ? "blue" : "black",
                  }}
                >
                  -{category.title}
                </h4>
                {category.children && category.children.length > 0 && (
                  <ul>
                    {category.children.map((child) => (
                      <li
                        key={child._id}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleParentCategoryClick("");
                          handleChildCategoryClick(child._id);
                        }}
                        style={{
                          cursor: "pointer",
                          color:
                            selectedChildCategory === child._id
                              ? "blue"
                              : "black",
                        }}
                      >
                        --{child.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Col>
        <Col md={8} lg={9}>
          {filteredProducts.length > 0 ? (
            <Row>
              {filteredProducts.map((product) => (
                <Col lg={3} md={6} sm={12} className="mb-4" key={product._id}>
                  <div className="product">
                    <div className="product-image-container">
                      <img
                        src={
                          product.thumbnail
                            ? product.thumbnail.startsWith("http")
                              ? product.thumbnail
                              : `http://localhost:5000${product.thumbnail}`
                            : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
                        }
                        alt={product.title || "Placeholder Image"}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.title}</h3>
                      <div className="bao-price">
                        <span className="product-price">
                          ${product.price.toFixed(2)} USD
                        </span>
                        {product.discountPercentage > 0 && (
                          <span className="original-price">
                            $
                            {(
                              product.price /
                              (1 - product.discountPercentage / 100)
                            ).toFixed(2)}{" "}
                          </span>
                        )}
                      </div>
                      <button variant="info" className="cart-button">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div>No products found in this category.</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ListProduct;
