import React, {useState, useEffect} from 'react';
import Layout  from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
	// hold product by sell and arrival
	const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		// sort by sold
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

// it will run when component is load for the first time and whenever their is change in state
useEffect(() => {
	loadProductsByArrival();
	loadProductsBySell();
}, []);

	return (
		<Layout title="HomePage" description="E-commerce App" className="container-fluid">
		  {/* {JSON.stringify(productsByArrival)} */}
            <Search/>
		  <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    

                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            {/* {JSON.stringify(productsBySell)} */}
		</Layout>
	);
};

export default Home;
