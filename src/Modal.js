import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal hide" id="exampleModal" tabindex="-1" role="dialog" data-backdrop="true" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="modal-img"><img src={this.props.singleList['imgUrl']} width="100" height="100" /></div>
                            </div>
                            <div className="col-md-8">
                                <div className="modal-title">{this.props.singleList['title']}</div>
                                <div className="modal-provider">{this.props.singleList['provider']}</div>
                            </div>
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="modal-description">{this.props.singleList['shortDescription']}</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.changeMode} className="btn btn-secondary" data-dismiss="modal" data-mode="description">More Details</button>
                        <button type="button" className="btn btn-primary">Go to Course</button>
                    </div>
                </div>
            </div>
        </div>
        
        );
    }

    changeMode = (event) => {
        let mode = event.target.dataset.mode;
        this.props.changeMode(mode);
    }
}

export default Modal;