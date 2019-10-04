import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";
import Rupiah from 'rupiah-format'

const Product = (props) => {
  const dataProduct = props.dataProduct
    return (
      <>
        <Card>
          <CardImg
            alt="..."
            src={`http://localhost:7373/${dataProduct.image}`}
            top
          />
          <CardBody>
            <CardTitle><h5>{dataProduct.name}</h5></CardTitle>
            <p>{dataProduct.name_category}</p>
            <CardText>
              <div style={{display: "grid"}}>
                <span>{dataProduct.description}</span>
                <span>{Rupiah.convert(dataProduct.price)}</span>              
              </div>
            </CardText>
            <Button
              color="primary"
              onClick={e => props.addCart(dataProduct)}
            >
              Add
            </Button>
          </CardBody>
        </Card>
      </>
    );
  }

export default Product;