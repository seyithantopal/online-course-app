import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            {this.props.data.map((list, i) => 
                <div className="col-sm-12 list" key={i}>
                <div className="col-sm-12">
                    <div className="list-title" onClick={this.showModal} data-single={list} data-key={list['courseId']} data-toggle="modal" data-target="#exampleModal" >{list['title']}</div>
                    <div className="list-provider">{list['provider']}</div>
                    <div className="list-description">{list['shortDescription']}</div>            
                    <ul className="sub-info" key={i}>
                        <li><div className="list-program"><img src="src/images/online.png" width="20" />{list['medium']}</div></li>
                        {list['medium'] === 'online' ? '' : <li><div className="list-location"><img src="src/images/location.png" width="20" />{list['location'] || 'San Francisco'}</div></li>}
                        <li><div className="list-cost"><img src="src/images/dollar.png" width="20" />${list['costUsd'] || 50}</div></li>
                        <li><div className="list-duration"><img src="src/images/date.png" width="20" />{this.props.periodConverter(list['duration'], list['durationPeriod'])}</div></li>
                    </ul>
                </div>
            </div>
            )}
            </div>
        );
    }

    showModal = (event) => {
        const key = parseInt(event.target.dataset.key);
        let singleList = this.props.data.filter(e => e.courseId === key);
        this.props.showModal(singleList[0]);
    }
}

export default List;