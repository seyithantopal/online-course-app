import React, { Component } from 'react';
//import './Accordion.css';

class Accordion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.accordion.map((accordion, i) =>
                <div id={i} key={i} className="accordion provider-option">
                <div className="card">
                <label data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`} className="option-name"><i className="down"></i>{accordion['title']}</label>
                    <div id={`collapse${i}`} className={i === 0 ? 'collapse show' : 'collapse'} data-parent={`#${i}`}>
                        <div className="card-body">
                            {accordion['type'] === 'checkbox' ?
                                
                                <ul className="collapse-ul" name={accordion['name']}>
                                    <li><input type="checkbox" data-level="Beginner" onClick={this.click} />Beginner</li>
                                    <li><input type="checkbox" data-level="Intermediate" onClick={this.click} />Intermediate</li>
                                    <li><input type="checkbox" data-level="Expert" onClick={this.click} />Expert</li>
                                    <li><input type="checkbox" data-level="Advanced" onClick={this.click} />Advanced</li>
                                </ul>
                            :
                            <div className="slide-container">
                                <input type="range" min="1" max="100" className="slider" id="myRange" />
                                <p>Value: <span id="demo"></span></p>
                            </div>
                            
                            }
                        </div>
                    </div>
                </div>
            </div>    
                )}
            </div>
        );
    }

    click = (event) => {
        this.props.levelChoice(event);
    }
}

export default Accordion;