import React from 'react';

import Layout from '../core/Layout';

const Signin = () => (
	<Layout title="SigninPage" description=" Signin to Node React E-commerce App">
		{process.env.REACT_APP_API_URL}
	</Layout>
);

export default Signin;
