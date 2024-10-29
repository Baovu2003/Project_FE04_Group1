import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Trà Phô Sữa Size X",
      price: 30000,
      quantity: 1,
      image: "/images/FullDrink.jpg",
    },
    {
      id: 2,
      name: "Trà Phô Sữa Size L",
      price: 60000,
      quantity: 1,
      image: "/images/FullDrink.jpg",
    },
  ]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleDeleteAll = () => setCartItems([]);

  const handleQuantityChange = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };
  const handleDeleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-5">
      {/* Breadcrumb */}
      <div className="mb-4">
        <h1 className="text-left">Cart Page</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cart Page
            </li>
          </ol>
        </nav>
      </div>

      {/* Cart Items and Total Price Section */}
      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-12">
          <div className="mb-4">
            <button className="btn btn-danger" onClick={handleDeleteAll}>
              <i className="bi bi-trash"></i> Delete All
            </button>
          </div>

          {/* Display Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        {item.price.toLocaleString("vi-VN")}đ x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex flex-column justify-content-center px-3 py-2">
                    {/* Total Price */}
                    <div className="mb-2">
                      Total price:
                      <strong className="ms-2">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </strong>
                    </div>

                    {/* Quantity Control */}
                    <div className="col-md-2 d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      border: "none",
                      width: "40px",
                      background: "none",
                      backgroundColor: "green",
                      borderRadius: "5px",
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "white",
                      fontWeight: "800",
                    }}
                    onClick={() => handleDeleteItem(item.id)} // Call delete handler
                  >
                   X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty</p>
          )}
        </div>

        <div className="col-lg-4 "></div>
        {/* Total Price Section */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Total Price</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong>{totalPrice.toLocaleString("vi-VN")}đ</strong>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-success w-100">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
