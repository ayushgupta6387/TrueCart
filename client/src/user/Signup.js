import React from 'react';

import Layout from '../core/Layout';

const Signup = () => {
	return (
		<Layout title="SignupPage" description="Node React E-commerce App">
		{process.env.REACT_APP_API_URL}
		</Layout>
	);
};
export default Signup;
