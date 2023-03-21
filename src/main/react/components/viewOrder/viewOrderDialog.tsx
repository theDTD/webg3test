import React, {useState, useEffect, useRef} from "react";

interface ViewOrderDialogProps {
    isOpen: (value: boolean) => void;
}

const ViewOrderDialog = ({ isOpen }: ViewOrderDialogProps) => {
    const [emailValue, setEmailValue] = useState("");
    const [emptyField, setEmptyField] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const formSubmitPath = "/vb/viewOrder/findMyOrders";

    const dialogRef: React.RefObject<HTMLDivElement> = useRef(null);

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setEmailValue(event.currentTarget.value)
    }

    const handleClickOutside = (e: React.MouseEvent) => {
        if (!dialogRef.current?.contains(e.target)) {
            handleClose();
        }
    }

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLInputElement> | KeyboardEvent) => {
        e.preventDefault();
        setEmptyField(!emailValue);
        setIsValidEmail(!!validateEmail(emailValue));

        if (!emptyField && validateEmail(emailValue) !== null) {
            fetch(`${formSubmitPath}`, {
                body: JSON.stringify({ email: emailValue }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .then(data => {
                    if (data.includes("success")) {
                        setSubmitSuccess(true);
                    }
                })
                .catch(error => console.log(error));
        }
    }

    const handleClose = () => {
        isOpen(false);
    }

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            isOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dialogRef])

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    })

    return (
        <>
            {

                <div id="#viewOrderDialog" className="viewOrder-dialog-wrapper" data-testid="viewOrder-dialog-wrapper">
                    <div className="viewOrder-dialog-container">

                        <div className="viewOrder-dialog" ref={dialogRef}>
                            <i data-testid="closeBtn" className="fas fa-times-circle" onClick={handleClose}></i>
                            <form
                                data-testid="form"
                                id="viewOrder-form"
                                className="viewOrder-form-wrapper"
                                action={formSubmitPath}
                                onSubmit={handleSubmit}
                            >
                                {
                                    (!submitSuccess)
                                        ?
                                        <>

                                            <h3>Forgot your order number?</h3>
                                            <p>Enter the email address associated with your order, and we'll send it to you.</p>
                                            <div className="viewOrder-formContainer">
                                                <div className="viewOrder-inputWrap">
                                                    <input
                                                        data-testid="emailInput"
                                                        value={emailValue}
                                                        type="text"
                                                        placeholder="Enter email"
                                                        name="email_address"
                                                        onChange={(e) => {
                                                            handleEmailChange(e)
                                                        }}
                                                    />
                                                    <button className="purple" data-testid="submitBtn" type="submit" id="ForgotSubmit">Submit</button>
                                                </div>
                                                {
                                                    (!isValidEmail && !emptyField) ?
                                                        <label htmlFor="email_address" className="viewOrder-error">Please enter a valid email address.</label>
                                                        : emptyField ? <label htmlFor="email_address" className="viewOrder-error">This field is required.</label>
                                                        : null
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            <h3 data-testid="submittedHeading">Check your inbox</h3>
                                            <p data-testid="submittedP">Your order numbers have been emailed to you.</p>
                                            <button data-testid="submittedCloseBtn" className="purple" type="button" onClick={handleClose}>Close</button>
                                        </>
                                }
                            </form>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default ViewOrderDialog;