import React from 'react';
import { Card } from 'semantic-ui-react'
import '../styles/App.css';


const QuestionCard = (props) => {

    const escapeHTML = (str) => {
        if (str != null) {
            return str.replace(/&(#|q|a)(\w+);/g, function (match, dec) {
                return String.fromCharCode(dec);
            });
        }
    }

    return (
        <Card className="QuestionCard" >
            <Card.Content>
                {props.questionObject.category}
            </Card.Content>
            <Card.Content>
                {escapeHTML(props.questionObject.question)}
            </Card.Content>
            <Card.Content extra>
                {props.questionObject.difficulty}
            </Card.Content>
        </Card>
    )
}

export default QuestionCard;