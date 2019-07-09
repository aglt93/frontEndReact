import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderDish(dish) {

        if(dish != null) {
        
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }

        else {
            return(
                <div/>
            )
        }
    }

    renderComments(dish) {

        if(dish != null) {
            return (
                <Card>
                    <CardBody>
                        <CardTitle>Comments</CardTitle>
                        <CardText>
                        {dish.comments.map(
                            function (comment) {
                                if(comment != null) {
                                    return (
                                        <div>
                                            <div> -- {comment.author}, {comment.date}</div>
                                            <div>{comment.comment}</div>
                                        </div>
                                    );
                                }  
                            })
                        }
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-6 cold-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }

}


export default DishDetail;