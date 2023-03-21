import React from 'react'
import {Container} from "@follett/common-ui";

const CheckBox = () => {

    return (
        <Container className="form-group">
            <label className="custom-checkbox">
                <input type="checkbox"/>
                <span>Keep me signed in <br/><small>Uncheck if using a public device.</small></span>
            </label>
        </Container>
    )
}

export default CheckBox;