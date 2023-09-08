import { Link } from "react-router-dom";

import { PATH as ADD_PRODUCT_PATH } from './pages/AddProduct/routes';
import { PATH as PRODUCTS_PATH } from './pages/Products/routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Manage products
        </h1>
        <Link to={ADD_PRODUCT_PATH}>Add new product</Link>
        <Link to={PRODUCTS_PATH}>View all products</Link>
      </header>
    </div>
  );
}

export default App;
