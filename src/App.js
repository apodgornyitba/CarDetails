import './App.css';
import BGMain from '../src/images/bg-main-desktop.png';
import cardFront from '../src/images/bg-card-front.png';
import cardBack from '../src/images/bg-card-back.png';
import cardLogo from '../src/images/card-logo.svg';
import React, {useState} from 'react';
import {Card, Container} from "@mui/material";

function App() {

    const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
    const [name, setName] = useState('Jane Appleseed');
    const [expirationDate, setExpirationDate] = useState('00/00');

    const containerStyle = {
        backgroundImage: `url(${BGMain})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        height: '100vh',
        margin: '0',
    };

    const CardWithBG = (props) => {
        const cardStyle = {
            backgroundImage: `url(${props.imageUrl})`,
            backgroundRepeat: 'no-repeat',
            width: '447px',
            height: '245px',
            boxShadow: 'none',
            backgroundColor: 'inherit',
            marginLeft: '10%',
            display: 'flex',
        };

        return <Card className="card" style={cardStyle}>
            {props.children}
        </Card>;
    };


    return (
        <div className="App">
            <Container className="leftContainer" style={containerStyle}>
                <CardWithBG imageUrl={cardFront}
                children={
                    <div className="cardContent">
                        <img className="logo" alt="cardLogo" src={cardLogo}/>
                        <p className="number">{cardNumber}</p>
                        <div className="nameExpirationContainer">
                            <p>{name}</p>
                            <p>{expirationDate}</p>
                        </div>
                    </div>
                }
                />
                <CardWithBG imageUrl={cardBack}/>
            </Container>
        </div>
    );
}

export default App;
