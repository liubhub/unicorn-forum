import React, { Component } from 'react';
import axios from 'axios';
import { FormWrapper, InputWrapper } from '../Forms/common';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
        this.onChange = this.props.onChange.bind(this);
    }

    componentWillMount() {
        const url = '/api/categories';
        fetch(url)
          .then(response => {
            return response.json();
          }).then(data => this.setState({data: data}));
    }

    render() {
        return this.state.data ? (

                <select id="selection" name="category" onChange={this.onChange} defaultValue={this.props.value} required>
                    {
                        this.state.data.map(elem =>
                            <option key={elem.id}>{elem.category_name}</option>
                        )
                    }
                </select>
        ) : null
    }
}


class ThreadModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            content: '',
            category: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        var name = event.target.name;
        console.log(value, name);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Wanna create thread');
        console.log('Sending token in headers with POST REquest')

        event.preventDefault();
        event.stopPropagation();

        // //  forms and axios post

        var userFormData = new FormData();

        const category = this.state.category || document.querySelector('#selection').value;
        userFormData.set('subject', this.state.subject);
        userFormData.set('content', this.state.content);
        userFormData.set('category', category);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };

        console.log('Sending request...');
        console.log(this.state.subject);
        console.log(this.state.content);
        console.log(userFormData);
        axios({
            method: 'post',
            url: '/thread/',
            data: userFormData,
            config: config
        }).then(function (response) {
            console.log(response);
            window.location.href = '/';
        })
            .catch(function (response) {
                console.log(response);
            });
    }

    onCloseModal(event){
        event.preventDefault();
        document.querySelector('.modal.is-active').classList.remove('is-active');
    }

    render() {
        return (
            <FormWrapper>
                <form method="post" onSubmit={this.handleSubmit} action="/thread">
                    <header className="modal-card-head">
                        <p className="modal-card-title">A New Thread</p>
                        <button className="delete" aria-label="close" onClick={this.onCloseModal}></button>
                    </header>

                    <section className="modal-card-body">
                        <InputWrapper name="subject" type="text" placeholder="Subject" onChange={this.handleInputChange} value={this.state.subject.value}/>
                        <textarea placeholder="Content" onChange={this.handleInputChange} className="textarea" value={this.state.content.value} name="content"/>
                        <div className="select">
                            <Select onChange={this.handleInputChange} value={this.state.category.value}/>
                        </div>
                        
                        {/* <InputWrapper name="category" type="text" placeholder="Category" onChange={this.handleInputChange} /> */}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleSubmit} type="button">Create Thread</button>
                        <button className="button is-text" type="button">Cancel</button>
                    </footer>
                </form>
            </FormWrapper>
        )


    }
}

export default ThreadModalForm;