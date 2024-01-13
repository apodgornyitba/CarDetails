import './App.css';
import BGMain from '../src/images/bg-main-desktop.png';
import cardFront from '../src/images/bg-card-front.png';
import cardBack from '../src/images/bg-card-back.png';
import cardLogo from '../src/images/card-logo.svg';
import icon from '../src/images/icon-complete.svg';
import React, {useState} from 'react';
import {Button, Card, Container, TextField} from "@mui/material";

function App() {

    const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
    const [name, setName] = useState('JANE APPLESEED');
    const [expirationDate, setExpirationDate] = useState('00/00');
    const [cvv, setCvv] = useState('000');

    const [currentComponent, setCurrentComponent] = useState(true);

    const [cardNumberError, setCardNumberError] = useState('');
    const [expMonthError, setExpMonthError] = useState('');
    const [expYearError, setExpYearError] = useState('');
    const [cvcError, setCvcError] = useState('');

    const handleClick = () => {
        setCurrentComponent(!currentComponent);
        if (currentComponent === false) {
            setExpirationDate('00/00');
            setCvv('000');
            setCardNumber('0000 0000 0000 0000');
            setName('JANE APPLESEED');
        }
    };

    const handleNameChange = (event) => {
        const value = event.target.value.toUpperCase();
        if (value !== '') {
            setName(value);
        } else {
            setName('JANE APPLESEED');
        }
    }

    const handleCardNumberChange = (event) => {
        const value = event.target.value;
        let formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue
            .match(/.{1,4}/g)
            ?.join(' ')
            .trim() || '';

        if (/^\d{1,16}$/.test(value.replace(/\s/g, ''))) {
            setCardNumber(formattedValue);
            setCardNumberError('');
        } else if (formattedValue === '') {
            setCardNumberError("Can't be blank");
            setCardNumber('0000 0000 0000 0000');
        } else {
            setCardNumberError('Wrong format, only number');
        }
    };


    const handleExpMonthChange = (event) => {
        const value = event.target.value;
        if (/^\d{1,2}$/.test(value) && value >= 1 && value <= 12) {
            setExpirationDate(`${value <= 9 ? '0' : ''}${value}/${expirationDate.split('/')[1]}`);
            setExpMonthError('');
        } else if (value === '') {
            setExpMonthError("Can't be blank");
            setExpirationDate(`${'00'}/${expirationDate.split('/')[1]}`);
        } else {
            setExpMonthError('Invalid month');
        }
    };

    const handleExpYearChange = (event) => {
        const value = event.target.value;
        if (/^\d{1,2}$/.test(value) && value >= 0 && value <= 99) {
            const formattedValue = value <= 9 ? `0${value}` : value;

            setExpirationDate(`${expirationDate.split('/')[0]}/${formattedValue}`);
            setExpYearError('');
        } else if (value === '') {
            setExpYearError("Can't be blank");
            setExpirationDate(`${expirationDate.split('/')[0]}/${'00'}`)
        } else {
            setExpYearError('Invalid year');
        }
    };


    const handleCvcChange = (event) => {
        const value = event.target.value;
        if (/^\d{1,3}$/.test(value)) {
            setCvv(value);
            setCvcError('');
        } else if (value === '') {
            setCvcError("Can't be blank");
            setCvv('000');
        } else {
            setCvcError('Invalid CVC');
        }
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
            {currentComponent === true ? (
                <Container className="rigthContainer" style={rightContainerStyle}>
                    <Card className="content"
                          sx={{
                              boxShadow: 'none',
                          }}
                    >
                        <p>CARDHOLDER NAME</p>
                        <TextField
                            placeholder="e.g. Jane Appleseed"
                            onChange={handleNameChange}
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: 'inherit',
                                width: '65%',
                                '& .MuiOutlinedInput-root': {
                                    fontFamily: 'inherit',
                                    borderRadius: '8.5px',
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
                            }}

                        />
                        <p>CARD NUMBER</p>
                        <TextField
                            placeholder="e.g. 1234 5678 9123 0000"
                            error={cardNumberError !== ''}
                            helperText={cardNumberError}
                            onChange={handleCardNumberChange}
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: 'inherit',
                                width: '65%',
                                '& .MuiOutlinedInput-root': {
                                    fontFamily: 'inherit',
                                    borderRadius: '8.5px',
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
                            }}
                        />
                        <div className="expAndCvc">
                            <div className="expDate">
                                <p>EXP. DATE (MM/YY)</p>
                                <div className="expDateFields">
                                    <TextField
                                        placeholder="MM"
                                        marginRight="5%"
                                        onChange={handleExpMonthChange}
                                        error={expMonthError !== ''}
                                        helperText={expMonthError}
                                        sx={{
                                            width: '40%',
                                            marginRight: '5%',
                                            boxShadow: 'none',
                                            backgroundColor: 'inherit',
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
                                        }}
                                    />
                                    <TextField
                                        placeholder="YY"
                                        width="40%"
                                        marginRight="5%"
                                        onChange={handleExpYearChange}
                                        error={expYearError !== ''}
                                        helperText={expYearError}
                                        sx={{
                                            width: '40%',
                                            marginRight: '5%',
                                            boxShadow: 'none',
                                            backgroundColor: 'inherit',
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
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="cvc">
                                <p>CVC</p>
                                <TextField
                                    placeholder="e.g. 123"
                                    width="190%"
                                    onChange={handleCvcChange}
                                    error={cvcError !== ''}
                                    helperText={cvcError}
                                    sx={{
                                        width: '190%',
                                        boxShadow: 'none',
                                        backgroundColor: 'inherit',
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
                                    }}
                                />
                            </div>
                        </div>
                        <div className="confirmButton">
                            <Button
                                onClick={handleClick}
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
            ) : (
                <Container style={rightContainerStyle}
                           sx={{
                               textAlign: 'center',
                               marginRight: '10%',
                           }}
                >
                    <Card className="tyContent"
                          sx={{
                              boxShadow: 'none',
                              '& p': {
                                  color: 'hsl(270, 3%, 87%)',
                              },
                              '& h1': {
                                  letterSpacing: '3px',
                              }
                          }}
                    >
                        <img alt="Complete Icon" src={icon}/>
                        <h1>THANK YOU!</h1>
                        <p>We've added your card details.</p>
                        <Button
                            onClick={handleClick}
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
                        >Continue</Button>
                    </Card>
                </Container>
            )}
        </div>
    );
}

export default App;
