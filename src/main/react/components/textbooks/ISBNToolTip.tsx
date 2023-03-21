import React, {Component} from 'react';

export default class ISBNToolTip extends Component {

    render() {
        return (
            <span className="position-absolute isbn-link">
                What's an ISBN?
                <span className="isbn-tooltip">
                    <h4 className="font-weight-bold">ISBN</h4>
                    <img src="https://images.valorebooks.com/images/vb/web/sellback/DVDPage/UPCImg.jpg" alt="Books"/>
                    <div lang="en" className="mt-2">
                      The ISBN is a 10 or 13 digit number that is unique to a particular title, author, edition, and publisher. It can be found on the back cover of each book.
                    </div>
                </span>
            </span>
        )
    }
}