import React, { Component } from 'react';
import axios from 'axios';

class CategoryButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            haveData: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        console.log('State when render', this.state);
        return (
            <div className={this.state.isActive ? "dropdown is-active" : "dropdown"}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={this.handleClick}>
                        <span>Categories</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                {this.state.haveData ? this.renderCategories() : ''}
            </div>
        )
    }

    handleClick(event) {
        this.setState({
            isActive: !this.state.isActive,
        });

        if (!this.state.data) {


            const url = '/api/category';

            axios(url)
                .then(data => {
                    this.setState({
                        haveData: true,
                        data
                    })
                    console.log(this.state);
                })
                .catch(err => console.warn('Error:', err));
        }
    }

    renderCategories() {
        const categories = this.state.data.data;

        var dropdown = categories.map(elem =>
            <a href="#" className="dropdown-item" key={elem.id}>{elem.category_name}</a>
        )

        console.log(dropdown)

        return (
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content">

                    {dropdown}

                </div>
            </div>
        );
    }
}

export default CategoryButton;