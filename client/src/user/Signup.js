import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {signUp} from '../auth';


const Signup = () => {

const [values, setValues] = useState({
	name:'',
	email:'',
	password:'',
	error:'',
	success: false
});

// destructure
const {name, email, password, success, error} = values;

// name could be name or email or password
const handleChange = name => event => {
	setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = event => {
	event.preventDefault();
	setValues({...values, error:false})
	signUp({ name, email, password }) // key and value are same
	.then(data => {
		if (data.error) {
			// ...values - rest operator (grab all the values)
			setValues({ ...values, error: data.error, success: false });
		} else {
			setValues({
				...values,
				name: "",
				email: "",
				password: "",
				error: "",
				success: true
			});
		}
	})
};


const showError = () => (
	<div
		className="alert alert-danger"
		style={{ display: error ? "" : "none" }}
	>
		{error}
	</div>
);
const showSuccess = () => (
	<div
		className="alert alert-info"
		style={{ display: success ? "" : "none" }}
	>
		New account is created. Please <Link to="/signin">Signin</Link> 
	</div>
);


	const signUpForm = () =>(
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} type="text" className="form-control"
					value={name}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={handleChange('email')} type="email" className="form-control"
					value={email}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Password</label>
				<input onChange={handleChange('password')} type="password" className="form-control"
					value={password}
				/>
			</div>

			<button onClick={clickSubmit} className="btn btn-primary">Submit</button>

		</form>
	)

	return (
		<Layout title="SignupPage"
		 description="Node React E-commerce App"
		 className="container col-md-8 offset-md-2"
		>
		{showSuccess()}
		{showError()}
		{signUpForm()}
		{/* {JSON.stringify(values)} */}
		</Layout>
	);
};
export default Signup;
