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

    const [cardNumberError, setCardNumberError] = useState('');
    const [expMonthError, setExpMonthError] = useState('');
    const [expYearError, setExpYearError] = useState('');
    const [cvcError, setCvcError] = useState('');

    const validateCardNumber = (value) => {
        const isValid = /^\d{16}$/.test(value);
        setCardNumberError(isValid ? '' : 'Wrong format');
        return isValid;
    };

    const validateExpMonth = (value) => {
        const isValid = value >= 1 && value <= 12;
        setExpMonthError(isValid ? '' : 'Invalid month');
        return isValid;
    };

    const validateExpYear = (value) => {
        const isValid = value >= 0 && value <= 99;
        setExpYearError(isValid ? '' : 'Invalid year');
        return isValid;
    };

    const validateCvc = (value) => {
        const isValid = /^\d{3}$/.test(value);
        setCvcError(isValid ? '' : 'Invalid CVC');
        return isValid;
    };

    const handleCardNumberChange = (event) => {
        const value = event.target.value;
        setCardNumber(value);
        validateCardNumber(value);
    };

    const handleExpMonthChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setExpirationDate(`${value <= 9 ? '0' : ''}${value}/${expirationDate.split('/')[1]}`);
        validateExpMonth(value);
    };

    const handleExpYearChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setExpirationDate(`${expirationDate.split('/')[0]}/${value <= 9 ? '0' : ''}${value}`);
        validateExpYear(value);
    };

    const handleCvcChange = (event) => {
        const value = event.target.value;
        setCvv(value);
        validateCvc(value);
    };


    const leftContainerStyle = {
        backgroundImage: `url(${BGMain})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        height: '100vh',
        margin: '0',
        padding: '0',
    };

    const rightContainerStyle = {
        display: 'grid',
        alignContent: 'center',
        marginLeft: '10%',
    };

    const CardWithBG = (props) => {
        const cardStyle = {
            backgroundImage: `url(${props.imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            width: '446px',
            height: '244px',
            borderRadius: '10px',
            boxShadow: '3px 3px 25px 3px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'transparent',
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
            marginRight: props.marginRight,

        };

        return <TextField className="textField" placeholder={props.placeholder} style={textFieldStyle}
                          sx={{

                              '& .MuiOutlinedInput-root': {
                                  fontFamily: 'inherit',
                                  borderRadius: '7.5px',
                              },
                              '& .MuiOutlinedInput-input': {
                                  height: '10px',
                              },
                              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderRadius: '7.5px',
                                  border: '2px solid transparent',
                                  background: 'linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box',
                                  WebkitMask:
                                      'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                  WebkitMaskComposite: 'xor',
                                  maskComposite: 'exclude',
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
                <Card className="content"
                      sx={{
                          boxShadow: 'none',
                      }}
                >
                    <p>CARDHOLDER NAME</p>
                    <CustomTextField
                        placeholder="e.g. Jane Appleseed"
                        width="65%"
                    />
                    <p>CARD NUMBER</p>
                    <CustomTextField
                        placeholder="e.g. 1234 5678 9123 0000"
                        width='65%'
                        onChange={handleCardNumberChange}
                        error={cardNumberError !== ''}
                        helperText={cardNumberError}
                    />
                    <div className="expAndCvc">
                        <div className="expDate">
                            <p>EXP. DATE (MM/YY)</p>
                            <div className="expDateFields">
                                <CustomTextField
                                    placeholder="MM"
                                    width="40%"
                                    marginRight="5%"
                                    onChange={handleExpMonthChange}
                                    error={expMonthError !== ''}
                                    helperText={expMonthError}
                                />
                                <CustomTextField
                                    placeholder="YY"
                                    width="40%"
                                    marginRight="5%"
                                    onChange={handleExpYearChange}
                                    error={expYearError !== ''}
                                    helperText={expYearError}
                                />
                            </div>
                        </div>
                        <div className="cvc">
                            <p>CVC</p>
                            <CustomTextField
                                placeholder="e.g. 123"
                                width="190%"
                                onChange={handleCvcChange}
                                error={cvcError !== ''}
                                helperText={cvcError}
                            />
                        </div>
                    </div>
                    <div className="confirmButton">
                        <Button
                            sx={{
                                backgroundColor: 'hsl(278, 68%, 11%)',
                                fontFamily: 'inherit',
                                color: 'hsl(270, 3%, 87%)',
                                width: '65%',
                                height: '50px',
                                borderRadius: '7.5px',
                                textTransform: 'none',
                                marginTop: '5%',
                                '&:hover': {
                                    backgroundColor: 'hsl(279, 6%, 55%)',
                                },
                            }}
                        >Confirm</Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
}

export default App;
