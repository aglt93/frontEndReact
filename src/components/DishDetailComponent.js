import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import uniqueid from 'uniqid';


class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }
    
    renderDish(dish) {

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

    renderComments(comments) {

        const commentsJSX = (
            <div key={uniqueid()} className="col-12 col-md-5 m-1">
                <h2>Comments</h2>
                <ul className="list-unstyled">
                    {comments.map((c) => {
                        return(<React.Fragment key={uniqueid()}>
                            <li className="p-2">{c.comment}</li>
                            <li className="p-2">
                                --{c.author}, 
                                {new Intl.DateTimeFormat('en-GB', 
                                        { year: 'numeric', month: 'long', day: '2-digit' }
                                    ).format(new Date(c.date))}
                            </li>
                        </React.Fragment>)
                    })}
                </ul>
            </div>
        );

        return commentsJSX;

    }

    render() {

        let renderValue = <div/>

        if(this.props.dish != null) {
        
            renderValue = (
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
            );
        }

        return renderValue;
    }
}

export default DishDetail;