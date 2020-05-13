import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.onPageClick = this.onPageClick.bind(this);

        this.state = {
            currPage: this.props.currPage,
            pagesAmount: this.props.pagesAmount,
            itemsOnPage: this.props.itemsOnPage
        }
    }

    componentDidMount() {
    }

    onPageClick(e) {
        this.props.onPageClick(e.target.value);
    }

    render() {

        let items = [];

        for (let i = 0; i < this.state.pagesAmount; i++) {
            if (this.state.currPage === i + 1)
                items.push(
                    <li onClick={this.onPageClick} key={i} className="pagination__curr" value={i + 1}>{i + 1}</li>
                )
            else
                items.push(
                    <li onClick={this.onPageClick} key={i} className="pagination__li" value={i + 1}>{i + 1}</li>
                )
        }

        return (
            <div className="pagination">
                <ul className="pagination__ul">
                    {items}
                </ul>
            </div>
        )
    }
}

export default (Pagination)