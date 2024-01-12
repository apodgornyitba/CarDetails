import './App.css';
import BGMain from '../src/images/bg-main-desktop.png';
import cardFront from '../src/images/bg-card-front.png';
import cardBack from '../src/images/bg-card-back.png';
import cardLogo from '../src/images/card-logo.svg';
import React, {useState} from 'react';
import {Button, Card, Container, TextField} from "@mui/material";

function App() {

    const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
    const [name, setName] = useState('JANE APPLESEED');
    const [expirationDate, setExpirationDate] = useState('00/00');
    const [cvv, setCvv] = useState('000');

    const leftContainerStyle = {
        backgroundImage: `url(${BGMain})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        height: '100vh',
        margin: '0',
        padding: '0',
    };

    const rightContainerStyle = {
        display: 'flex',
        justifyContent: 'center',

    };

    const CardWithBG = (props) => {
        const cardStyle = {
            backgroundImage: `url(${props.imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            width: '447px',
            height: '245px',
            boxShadow: 'none',
            backgroundColor: 'inherit',
            marginLeft: '25%',
            marginBottom: '5%',
        };

        return <Card className="card" style={cardStyle}>
            {props.children}
        </Card>;
    };

    const CustomTextField = (props) => {
        const textFieldStyle = {
            boxShadow: 'none',
            backgroundColor: 'inherit',
            width: props.width,

        };

        return <TextField className="textField" placeholder={props.placeholder} style={textFieldStyle}
                          sx={{
                              '& .MuiOutlinedInput-root': {
                                  fontFamily:'inherit',
                                  borderRadius: '10px',

                              },
                              '& .MuiOutlinedInput-input': {
                                  height: props.height,
                              },
                          }}/>;
    };

    return (
        <div className="App">
            <Container className="leftContainer" style={leftContainerStyle}>
                <div className="front">
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
                </div>
                <div className="back">
                    <CardWithBG imageUrl={cardBack}
                                children={
                                    <div className="cardContent">
                                        <p className="cvv">{cvv}</p>
                                    </div>
                                }
                    />
                </div>
            </Container>
            <Container className="rigthContainer" style={rightContainerStyle}>
                <Card className="content">
                    <p>CARDHOLDER NAME</p>
                    <CustomTextField
                        placeholder="e.g. Jane Appleseed"
                        width="40%"
                        height="15px"
                    />
                    <p>CARD NUMBER</p>
                    <CustomTextField
                        placeholder="e.g. 1234 5678 9123 0000"
                        width='40%'
                        height="15px"
                    />
                    <div className="expAndCvc">
                        <div className="expDate">
                            <p>EXP. DATE (MM/YY)</p>
                            <div className="expDateFields">
                                <CustomTextField
                                    placeholder="MM"
                                    height="15px"
                                    width="45%"
                                />
                                <CustomTextField
                                    placeholder="YY"
                                    height="15px"
                                    width="45%"
                                />
                            </div>
                        </div>
                        <div className="cvc">
                            <p>CVC</p>
                            <CustomTextField
                                placeholder="e.g. 123"
                                height="15px"

                            />
                        </div>
                    </div>
                    <div>
                        <Button>CONFIRM</Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
}

export default App;
