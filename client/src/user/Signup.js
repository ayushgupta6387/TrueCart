import React, {useState} from 'react';

import Layout from '../core/Layout';

import { API } from "../config";

const Signup = () => {

const [values, setValues] = useState({
	name:'',
	email:'',
	password:'',
	error:'',
	success: false
});

// destructure
const {name, email, password} = values;

// name could be name or email or password
const handleChange = name => event => {
	setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = event => {
	event.preventDefault();
	signup({ name, email, password }) // key and value are same
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

const signup = user => {
// console.log(name, email, password);
// send data to backend
fetch(`${API}/signup`, {
	method: "POST",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	body: JSON.stringify(user)
})
	.then(response => {
		return response.json();
	})
	.catch(err => {
		console.log(err);
	});
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
		{error}
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
		{signUpForm()}
		{JSON.stringify(values)}
		</Layout>
	);
};
export default Signup;
