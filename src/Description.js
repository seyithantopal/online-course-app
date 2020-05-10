import React, { Component } from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="description-background-image"><div className="mask">&nbsp;</div><img src={this.props.singleList['imgUrl']} /></div>
                        </div>
                    </div>
                </div>
        
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 description-top">
                            <div className="description-title">{this.props.singleList['title']}</div>
                            <div className="description-provider">{this.props.singleList['provider']}</div>
                            <div className="description-stars">
                                <ul>
                                    <li><img src="src/images/full-star.png" width="16" height="16" /></li>
                                    <li><img src="src/images/full-star.png" width="16" height="16" /></li>
                                    <li><img src="src/images/full-star.png" width="16" height="16" /></li>
                                    <li><img src="src/images/full-star.png" width="16" height="16" /></li>
                                    <li><img src="src/images/empty-star.png" width="16" height="16" /></li>
                                </ul>
                            </div>
                            <div className="description-button"><button>Go to Course</button><button onClick={this.changeMode} data-mode="default">Go Back</button></div>
                        </div>
                    </div>
                </div>
        

                <div className="container description-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="description-heading">Description</div>
                            <hr />
                            <div className="description-description">{this.props.singleList['shortDescription']}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="program-info">

                                <div className="single-info">
                                    <div className="icon-circle">
                                        <img src="src/images/online.png" width="32" height="32" />
                                    </div>
                                    <label>{this.props.singleList['medium']}</label>
                                </div>
                                
                                <div className="single-info">
                                    <div className="icon-circle">
                                        <img src="src/images/dollar.png" width="32" height="32" />
                                    </div>
                                    <label>${this.props.singleList['costUsd'] || 50}</label>
                                </div>

                                <div className="single-info">
                                    <div className="icon-circle">
                                        <img src="src/images/date.png" width="32" height="32" />
                                    </div>
                                    <label>{this.props.periodConverter(this.props.singleList['duration'], this.props.singleList['durationPeriod'])}</label>
                                </div>
                            </div>
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

export default Description;