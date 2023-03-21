import React  from 'react'
import PropTypes from 'prop-types'
import {Container} from "@follett/common-ui";

const FormBtn = ({ type, children }) => {

    const className = `btn ${type}`

    return (
        <Container className="form-group">
            <button className={className}>{children}</button>
        </Container>

    )
}
FormBtn.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string
}

export default FormBtn;