import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = (props) => {
    
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const validName = !isEmpty(enteredName);
        const validCity = !isEmpty(enteredCity);
        const validStreet = !isEmpty(enteredStreet);
        const validPostalCode = isFiveChar(enteredPostalCode);

        const formIsValid = validCity && validName && validPostalCode && validStreet;
        setFormInputsValidity({
            name: validName,
            city: validCity,
            postalCode: validPostalCode,
            street: validStreet
        });
        if(!formIsValid) return;
        
        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode: enteredPostalCode
        });
        
    };

    const nameInputClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;


    const cityInputClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;


    const streetInputClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;


    const postalCodeInputClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameInputClasses}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='text' id='name' />
            {!formInputsValidity.name && <p>Please Enter a valid Name</p>}
        </div>
        <div className={streetInputClasses}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street' />
            {!formInputsValidity.street && <p>Please Enter a valid Street</p>}
        </div>
        <div className={postalCodeInputClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef} />
            {!formInputsValidity.postalCode && <p>Please Enter a valid postal code</p>}
        </div>
        <div className={cityInputClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please Enter a valid City</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
                Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
    </div>
    </form>
    );
};

export default Checkout;