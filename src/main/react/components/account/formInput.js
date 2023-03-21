import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Container} from "@follett/common-ui";

const FormInput = ({ type, className, placeholder }) => {

    const [inputType, setInputType] = useState(type)
    const [inputValue, setInputValue] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordBtn, setPasswordBtn] = useState("Show")

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
        setPasswordBtn(showPassword ? "Show" : "Hide")
        setInputType(showPassword ? "password" : "text")
    }

    return (
        <Container className="form-group">
            <input class={className} type={inputType} value={inputValue} onChange={handleChange} placeholder={placeholder} />
            { (inputType === "text" || inputType === "password") &&
            <span className="show-password" onClick={toggleShowPassword}>{passwordBtn}</span>
            }
        </Container>
    )
}

FormInput.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string
}

export default FormInput;