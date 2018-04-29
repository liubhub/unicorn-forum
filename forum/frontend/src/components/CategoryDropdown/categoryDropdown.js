// // при клике необходимо поменять класс родителя на активный,
// // подгрузить элементы категорий из бд
// // вставить их в соответствующие дивы в родителяи 
// // отрендереить

import React, { Component } from 'react';

class CategoryButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            hasData: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
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
                {this.state.hasData ? renderCategories() : ''}
            </div>
        )
    }

    handleClick(event) {
        console.log('clicked')
        this.setState({
            isActive: !this.state.isActive,
        });
    }
}

export default CategoryButton;


// // const CategoryDropdown = ({ 
// //     fetching,
// //     data,
// //     reset
// // }) => (
// //     fetching ?
// //     <p>Loading...</p> :

// //     <div class="dropdown-menu" id="dropdown-menu3" role="menu">
// //     <div class="dropdown-content">

// //         {/* { data.map((elem) => {

// //             })
// //         } */}
// //         data

// //     </div>
// //     </div>
// // );


// class CategoryButton extends Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             isActive: false
//         }

//         this.handleClick = this.handleClick.bind(this)
//     }

//     handleClick() {
//         this.setState({
//             isActive: !this.state.isActve,
//         });
//     }

//     render() {
//         console.log("rendering category button suka");
//         return (
//            <div>Hello</div>
//         )
//     }
// }

// // {this.state.isActive ? "dropdown is-active" : "dropdown"}
