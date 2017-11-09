import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import DetailsTable from './DetailsTables'
import Form from './Form'
import FixedCosts from './FixedCosts/index'
import Head from './Head'
import Intro from './Intro'
import Scenarios from './Scenarios'
const App = () =>
      <Container>
        <Head />
        <Intro />
        <Row><Col><h3>Die Szenarien</h3></Col></Row>
        <Scenarios />
        <Row>
          <Col style={{padding: '1em'}} xs={12} sm={12} md={6}>
            <Row><Col><h3>Parameter</h3></Col></Row>
            <Row><Col><Form/></Col></Row>
          </Col>
          <Col style={{padding: '1em'}} xs={12} sm={12} md={6}>
            <Row><Col><h3>Fixkosten</h3></Col></Row>
            <Row><Col><FixedCosts/></Col></Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailsTable />
          </Col>
        </Row>
      </Container>

export default App
