import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import '../styles/App.css';

const Question = (props) => {

    const [oneQuestion, setOneQuestion] = useState([]);

    useEffect(() => {
        if (props.triviaData && props.triviaIndex >= 0) {
            setOneQuestion(props.triviaData[props.triviaIndex])
        }
    }, [props.triviaIndex, props.triviaData]);

    return (
        <div className="Question">
            {props.started &&
                <QuestionCard questionObject={oneQuestion} />
            }
            <br /><br /><br />
            {!props.started &&
                <button onClick={() => props.onClick()}>Double Click to Begin</button>
            }
        </div>
    );
}

export default Question;
