import React from 'react';
import Card from 'react-bootstrap/Card';


class Description extends React.Component {

  render() {    
    return (
      <>
        <Card className="mx-auto text-center mt-2 border-0">
          <Card.Body>
          <Card.Text>{this.props.text}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }


}

export default Description;