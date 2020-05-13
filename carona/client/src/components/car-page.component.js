import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import CommentList from "./comment-list.component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import config from '../config/config';
const url = config.url;

export default class CarPage extends Component {

    constructor(props) {
        super(props);

        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeOpenModal = this.onChangeOpenModal.bind(this);

        this.state = {
            images: [],
            brand: '',
            model: '',
            year: '',
            price: '',
            commentsId: [],
            comment: '',
            info: '',
            openModal: false,
            loading: true
        }
    }

    componentDidMount() {
        document.title = "Carona";

        axios.get(url + window.location.pathname)
            .then(res => {
                this.setState({
                    images: res.data[0].images,
                    brand: res.data[0].brand,
                    model: res.data[0].model,
                    year: res.data[0].year,
                    price: res.data[0].price,
                    commentsId: res.data[0].commentsId,
                    info: res.data[0].info,
                    loading: false
                });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in CarPage.component\n", err);
            })
    }

    CarouselImages() {
        let images = [];

        for (let i = 0; i < this.state.images.length; i++) {
            images.push(<Carousel.Item key={i}>
                <img
                    className="d-block w-100"
                    src={this.state.images[i]}
                    alt="car"
                />
            </Carousel.Item>);
        }
        return images;
    }

    onSubmitComment(e) {
        e.preventDefault();

        if (this.state.comment.length > 0) {
            this.setState({ loading: true }, () => {
                const data = {
                    comment: this.state.comment,
                    carId: window.location.pathname.slice(6, window.location.pathname.length)
                }
                axios.post(url + '/comments/create', data)
                    .then(x => {
                        document.getElementsByClassName("comment__area").value = '';
                        let commentsId = this.state.commentsId;
                        commentsId.push(x.data);

                        this.setState({
                            loading: false,
                            comment: '',
                            commentsId: commentsId
                        });
                    })
                    .catch(err => console.log(err))
            })
        }
    }

    onChangeComment(e) {
        this.setState({ comment: e.target.value });
    }

    onDeleteFunc = (id) => {
        this.setState({ loading: true }, () => {
            let commentsId = this.state.commentsId;
            const index = commentsId.indexOf(id);
            if (index > -1)
                commentsId.splice(index, 1);
            this.setState({ commentsId: commentsId });
            this.setState({ loading: false });
        })
    }

    onChangeOpenModal(e) {
        if (this.state.openModal)
            this.setState({ openModal: false })
        else
            this.setState({ openModal: true })
    }

    render() {

        const carousel = (
            <Carousel interval="2000" indicators={false}>
                {this.CarouselImages()}
            </Carousel>
        )

        const carName = this.state.brand + ' ' + this.state.model + ' ' + this.state.year;

        return (
            <div className="wrapper">
                {/* {this.state.loading ? '' : */}
                {/* <div> */}
                {carousel}
                <p className="title_text"><span className="title_span">{carName}</span></p>
                <div className="container">
                    <div className="textStyle">
                        <div className="info">
                            {this.state.info}
                        </div>
                        <b className="price">Price: {this.state.price}</b>
                        <b className="order" onClick={this.onChangeOpenModal} data-toggle="modal" data-target="#basicExampleModal">Make an order</b>
                    </div>
                    <textarea className="comment__area"
                        onChange={this.onChangeComment}
                        placeholder="Leave your comment here"
                    />
                    <input type="submit"
                        className="btn btn-light"
                        value="Submit"
                        onClick={this.onSubmitComment}
                    />
                    <br />
                    <div className="row">
                        <div className="col-8  pt-3">
                            {this.state.loading ? '' : <CommentList
                                commentsId={this.state.commentsId} onDeleteFunc={this.onDeleteFunc}
                            />}
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.openModal} className={"className"}>
                    <ModalHeader>Please, write down your phone number</ModalHeader>
                        <ModalBody>
                            We will contact with you in soon
                            <input type="number" className="form-control" />
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onDelete}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.onChangeOpenModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            // }
            // </div>
        )
    }
}