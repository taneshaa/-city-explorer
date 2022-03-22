import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
// import server from ./server.js

function App() {
  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="City" placeholder="Enter city" />
          <Form.Text className="text-muted">
        
          </Form.Text>
        

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">

      </Form.Group>
      <Button variant="primary" type="submit">
        Explore!
      </Button>
    </Form>
      {/* <Button variant="primary">Explore!</Button>{' '} */ }
    </div >
  );
}

export default App;
