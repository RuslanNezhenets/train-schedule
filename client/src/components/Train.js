import React from 'react';
import {Card} from "react-bootstrap";

const Train = ({item}) => {
    return (
        <Card className="mt-3 train">
            <div className="header">
                <div className="train_name">{item.train}</div>
                <div>{item.startStation} --></div>
                <div>{item.endStation}</div>
            </div>
            <div className="main">
                <div className="main_column">
                    <div><b>Відправлення</b></div>
                    <div>{item.startTime}</div>
                </div>
                <div className="main_column">
                    <div><b>Прибуття</b></div>
                    <div>{item.endTime}</div>
                </div>
            </div>
        </Card>
    );
};

export default Train;