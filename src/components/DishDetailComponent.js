import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, Button, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import uniqueid from 'uniqid';
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length > len);

function RenderDish({dish}) {

    const dishDetail = (
        <div key={uniqueid()} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );

    return dishDetail;
}

function RenderComments({comments, addComment, dishId}) {

    const commentsJSX = (
        <div key={uniqueid()} className="col-12 col-md-5 m-1">
            <h2>Comments</h2>
            <ul className="list-unstyled">
                {comments.map((c) => {
                    return(
                        <React.Fragment key={uniqueid()}>
                            <li className="p-2">{c.comment}</li>
                            <li className="p-2">
                                --{c.author} {" , "} 
                                {new Intl.DateTimeFormat('en-US', 
                                        { year: 'numeric', month: 'short', day: '2-digit' }
                                    ).format(new Date(c.date))}
                            </li>
                        </React.Fragment>
                    )
                })}
                <li className="p-2">
                    <CommentForm 
                        addComment={addComment}
                        dishId={dishId}
                    />
                </li>
            </ul>
        </div>
    );

    return commentsJSX;

}

const DishDetail = (props) => {

    let renderValue = <div/>

    if(props.dish != null) {

        renderValue = (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments 
                        comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }

    return renderValue;
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
        this.toggleModal();
    }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"> Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values => this.handleSubmit(values))}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control" defaultValue="1"
                                    defaultChecked="1"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name</Label>                   
                            <Col md={12}>
                                <Control.text model=".name" id="name"
                                    name="name" placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>                       
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment"
                                    name="comment" rows="6"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }


}

export default DishDetail;