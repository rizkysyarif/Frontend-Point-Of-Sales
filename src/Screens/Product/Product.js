import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import Rupiah from 'rupiah-format'
import './Product.css'


const Product = (props) => {
 
  const handleDelete = async (data, id) => {
    fetch("http://localhost:9000/api/product/" + id , {method:"DELETE"});
    if(window.confirm('Are You Sure to Delete This Product'))
    window.location.href = 'http://localhost:3000/Dashboard'
  }

  

  const dataProduct = props.dataProduct
    return (
      <>
        <Card className='product'>
          <CardImg
            alt="..."
            src={`http://localhost:9000/${dataProduct.image}`}
            top
          />
          <CardBody>
            <CardTitle><h5>{dataProduct.name}</h5></CardTitle>
            <p>{dataProduct.name_category}</p>
            <CardText>
              <div style={{display: "grid"}}>
                <span>{dataProduct.description}</span>
                <span>{Rupiah.convert(dataProduct.price)}</span>   
                <span>Stock : {(dataProduct.count)}</span>  

              </div>
            </CardText>
            <Button outline className="ml-5" color="primary" style={{justifyContent:'center'}} onClick={e => props.addCart(dataProduct)}>
            <i className="fas fa-plus"/> Add To Cart
            </Button> 
            <span >
            <Button outline color="danger" className="btn btn-md mt-2 ml-3" onClick={() => handleDelete(dataProduct, dataProduct.id)} > <i className="far fa-trash-alt"/> Delete </Button> 
            <Button outline color="info" className="btn btn-md mt-2 ml-4"  href={"UpdateProduct/"+ dataProduct.id } > <i className="far fa-edit"/> Update </Button>
             
            </span>
          </CardBody>
        </Card>
      </>
    );
  }

export default Product;