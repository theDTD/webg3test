import React, { useState } from 'react'
import PropTypes from 'prop-types'

const RadioGroup = ({ name, options }) => {

    const defaultCheckedOption = options.find(option => option.defaultChecked)
    const defaultCheckedValue = defaultCheckedOption.value

    const [selected, setSelected] = useState(defaultCheckedValue)

    const handleChange = (value) => {
        setSelected(value)
    }

    return (
        <form>
            {options.map((option, index) => {
                const {value, label} = option;

                return (
                    <div key={index}>
                        <input
                            type="radio"
                            name={name}
                            id={value}
                            value={value}
                            checked={selected === value}
                            onChange={() => handleChange(value)}
                        />
                        <label htmlFor={value}>{label}</label>
                    </div>
                )

            })}
        </form>
    )
}

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: (props) => {

        let valueError;
        let labelError;
        let defaultCheckedError;
        const radioOptionsArray = props.options;

        const radioOptionsValues = radioOptionsArray.map(({ value }) => {
            if (typeof value !== "string") valueError = value
            return value
        } );

        const radioOptionsLabels = radioOptionsArray.map(({ label }) => {
            if (typeof label !== "string") labelError = label
            return label
        } );

        const checkDuplicates = () => {
            return new Set(radioOptionsValues).size !== radioOptionsValues.length
        }

        const radioDefaultChecked = radioOptionsArray.flatMap(({ defaultChecked }) => {
            if (defaultChecked && typeof defaultChecked !== "boolean") defaultCheckedError = true
            return defaultChecked ? defaultChecked : []
        })

        if (valueError) return new Error(`${valueError} is not a string.`)
        if (checkDuplicates()) return new Error(`Duplicate values found. Values must be unique`)
        if (labelError) return new Error(`${labelError} is not a string`)
        if (radioDefaultChecked.length > 1) return new Error(`Only one defaultChecked is allowed.`)
        if (defaultCheckedError) return new Error(`defaultChecked must be a boolean`)

    }
}

export default RadioGroup