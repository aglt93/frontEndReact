import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import uniqueid from 'uniqid';

    
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

function RenderComments({comments}) {

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
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            </div>
        );
    }

    return renderValue;
}

export default DishDetail;