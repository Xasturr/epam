import React, { Component } from 'react';
import Comment from "./comment.component";

export default class CommentList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commentsId: this.props.commentsId,
        }
    }

    componentDidMount() {
    }

    CommentList() {
        return this.state.commentsId.map(id => {
            return <Comment key={id} id={id} onDeleteFunc={this.props.onDeleteFunc}/>
        })
    }

    render() {

        return (
            <div className="commentList">
                <h5 className="text-muted mb-4">
                    <span className="badge badge-dark">{this.state.commentsId.length}</span>{" "}
                    Comment{this.state.commentsId.length > 0 ? "s" : ""}
                </h5>

                {this.state.commentsId.length === 0 && !this.props.loading ? (
                    <div className="comment__first">
                        Be the first to comment
                    </div>
                ) : null}

                {this.CommentList()}
            </div>
        )
    }
}