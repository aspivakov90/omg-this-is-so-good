import Snowfall from "react-snowfall"

import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-quill/dist/quill.snow.css"
/* Add css for simplicity, in the real world I would use any CSS-in-JS, SCSS, styled-components, other utility css, etc */
import "./style.css"

import DnDProvider from "./components/SortableList/DnDProvider"
import ProductForm from "./components/ProductForm"

const App = () => (
  <DnDProvider>
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-dark"
    >
      <Snowfall />
      <Row className="w-100 justify-content-center p-4">
        <Col lg={6} md={8} sm={12}>
          <Card className="w-100 position-relative">
            <img
              src="/assets/decoration.png"
              height={200}
              alt="Decoration"
              className="position-absolute end-0 decoration"
            />
            <Card.Body className="p-4">
              <ProductForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </DnDProvider>
)

export default App
