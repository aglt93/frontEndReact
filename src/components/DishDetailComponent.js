import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render() {

        let renderValue = <div/>

        if(this.props.dish != null) {
        
            renderValue = <React.Fragment>
                <div key={this.props.dish.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div key={this.props.dish.id} className="col-12 col-md-5 m-1">
                    <h2>Comments</h2>
                    <ul className="list-group">
                        {this.props.dish.comments.map((com) => {
                            return(<React.Fragment>
                                <li class="list-group-item">{com.author}, {com.date}</li>
                                <li class="list-group-item">{com.comment}</li>
                            </React.Fragment>)
                        })}
                    </ul>
                </div>
            </React.Fragment>
        }

        return renderValue;
    }
}

export default DishDetail;