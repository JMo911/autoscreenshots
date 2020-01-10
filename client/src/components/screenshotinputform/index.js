import React from 'react';
import './style.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ScreenshotInputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          email: '',
          password: '',
          module_id: '',
          module_slug: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }
  
    handleSubmit(event) {
      console.log('An email was submitted: ' + this.state.email);
      console.log('A password was submitted: ' + this.state.password);
      console.log('A module_id was submitted: ' + this.state.module_id);
      console.log('A module_slug was submitted: ' + this.state.module_slug);
      
      event.preventDefault();
      axios({
        method: "get",
        url: '/api/screenshots/' + this.state.module_slug + '/' + this.state.module_id
        // headers: {
        //   Authorization: "Bearer " + finalToken
        // }
      })
      .then(response => {
        const data = response.data;
        // this.setState({ data:data })
        console.log("Our data is: ", data);

      }).catch(function(error) {
        console.log(error);
      })
        





    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Builder Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Builder Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Form.Group controlId="formBasicModuleId">
                <Form.Label>Module ID</Form.Label>
                <Form.Control type="text" placeholder="Module ID Number" name="module_id" value={this.state.module_id} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicModuleSlug">
                <Form.Label>Module Slug</Form.Label>
                <Form.Control type="text" placeholder="Module Slug" name="module_slug" value={this.state.module_slug} onChange={this.handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Get me screenshots!
            </Button>
        </Form>
      );
    }
  }

  export default ScreenshotInputForm;