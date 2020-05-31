import React, { Component } from 'react';
import axios from 'axios';
import config from '../config/config';
const url = config.url;

export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);

        this.state = {
            id: this.props.id,
            image: '',
            fullname: '',
            comment: '',
            createdAt: ''
        }
    }

    componentDidMount() {
        axios.get(url + '/comments/' + this.state.id)
            .then(comment => {
                this.setState({
                    image: comment.data[0].image,
                    fullname: comment.data[0].fullname,
                    comment: comment.data[0].comment,
                    createdAt: comment.data[0].createdAt,
                });
            })
            .catch(err => console.log(err))
    }

    onDelete(e) {
        const data = {
            commentId: this.state.id,
            carId: window.location.pathname.slice(6, window.location.pathname.length)
        }
        axios.delete(url + '/comments/' + this.state.id + '/delete')
            .then(res => {
                return axios.put(url + '/cars/' + this.state.carId + '/deletecomment', data)
            })
            .then(res => {
                this.props.onDeleteFunc(this.state.id);
            })
            .catch(err => console.log(err))
    }

    render() {

        const deleteText = (
            <small className="mt-0 mb-1 text-muted" id="deleteTextId" onClick={this.onDelete}>delete comment</small>
        )

        const bgStyle = {
            "background": "rgb(30, 30, 30)"
        }

        const body = (
            <>
                <img
                    className="mr-3 bg-light rounded"
                    width="48"
                    height="48"
                    src={this.state.image}
                    alt='ava'
                />
                <div className="media-body p-2 shadow-sm rounded border" id="asd" style={bgStyle}>
                    <small className="float-right text-muted">{this.state.createdAt.slice(0, this.state.createdAt.length - 51)}</small>
                    <h6 className="textStyle">{this.state.fullname}</h6>
                    <br />
                    <p className="textStyle">{this.state.comment}</p>
                    {deleteText}
                </div>
            </>
        )

        return (
            <div className="media mb-3">
                {body}
            </div>
        )
    }
}