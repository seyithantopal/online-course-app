import React, { Component } from 'react';
import './App.css';

import Accordion from './Accordion';
import List from './List';
import Modal from './Modal';
import Description from './Description';

class App extends Component {
  constructor(props) {
    super(props);
    this.accordion = [
      /*{title: 'Provider', name: 'provider', type: 'checkbox'},
      {title: 'Sub Provider', name: 'sub-provider', type: 'checkbox'},
      {title: 'Category', name: 'category', type: 'checkbox'},
      {title: 'CostUsd', name: 'costusd', type: 'range'},
      {title: 'Duration', name: 'duration', type: 'range'},
      {title: 'Effort', name: 'effort', type: 'range'},
      {title: 'Medium', name: 'medium', type: 'checkbox'},*/
      {title: 'Level', name: 'level', type: 'checkbox'},
      /*{title: 'Location', name: 'location', type: 'checkbox'},
      {title: 'Language', name: 'language', type: 'checkbox'}*/
    ];
    this.levels = [];
    this.state = {
      data: [],
      input: '',
      searchFilter: false,
      levelFilter: false,
      filteredData: [],
      mode: 'default',
      singleList: [],
      results: 0
    };
    this.handleLoad = this.handleLoad.bind(this);

  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
  }

  handleLoad() {
    this.fetchData();
  }


  render() {
    if(this.state.mode === 'default') {
      return(
        <div className="container">
           <div className="row">
                  <div className="col-md-12 item-information">Showing <b>{this.state.results}</b> Courses</div>
              </div>
              <div className="row">
                  <div className="input-group mb-3 search-box">
                      <input type="text" onChange={this.searchHandler} value={this.state.input} className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                    </div>
              </div>
              <div className="row">
                  <div className="col-sm-3 filter">       
                      <Accordion
                      accordion={this.accordion}
                      data={this.state.data}
                      levelChoice={this.levelChoice} />
                  </div>
                  <div className="col-sm-9 search">
                      <div className="row list-box">
                      <List 
                        data={this.state.searchFilter === true || this.state.levelFilter === true ? this.state.filteredData : this.state.data}
                        changeMode={this.changeMode}
                        showModal={this.showModal}
                        periodConverter={this.periodConverter} />
                      </div>
                  </div>
              </div>
              <Modal 
                singleList={this.state.singleList}
                changeMode={this.changeMode} />
        </div>
      );
    } else if(this.state.mode === 'description') {
      return(
        <Description 
          singleList={this.state.singleList}
          periodConverter={this.periodConverter}
          changeMode={this.changeMode} />
      );
    }
  }

  fetchData = async () => {
    const response = await fetch('https://quze-intern-test.s3.us-east-2.amazonaws.com/course-data.json', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(data => {
      this.setState({
        data: data,
        results: data.length
      })
    });
  }


  // Search Filter Start
  searchHandler = (event) => {
    let input = event.target.value;
    this.setState({
      input: input,
      searchFilter: input.length > 0 ? true : false
    }, this.filterSearch(input));
  }

  filterSearch = (input) => {
    let newData = [];
    const filteredData = this.state.data.map((el, i) => {
      if(el['title'].toLowerCase().indexOf(input.toLowerCase()) > -1) {
        newData.push(el);
      }
    });
    this.setState({
      filteredData: newData,
      results: newData.length
    });
  }
  // Search Filter End


  // Level Filter Start
  levelChoice = (event) => {
    let levelName = event.target.dataset.level;
    let index = this.levels.indexOf(event.target.dataset.level);
    
    if(index <= -1 && event.target.checked === true) this.levels.push(levelName);
    else if(index > -1 && event.target.checked === false) this.levels.splice(index, 1);

    this.setState({
      levelFilter: this.levels.length > 0 ? true : false
    }, this.levelFilter(event));
  }

  levelFilter = (event) => {
    let newData = [];
    const filteredData = this.state.data.map((el, i) => {
      for(let level of this.levels) {
        if(level.indexOf(el['level']) > -1) newData.push(el);
      }
    });    
    this.setState({
      filteredData: newData,
      results: newData.length
    });
  }
  // Level Filter End


  changeMode = (mode) => {
    this.setState({
      mode: mode
    });

  }

  showModal = (singleList) => {
    this.setState({
        singleList: singleList
    });
  }

  periodConverter = (period, durationPeriod) => {
    let duration = '';
    if(durationPeriod === 'h') {
        if(period > 1) {
            duration = 'hours';
        } else {
            duration = 'hour';
        }
    }
    
    if(durationPeriod === 'w') {
        if(period > 1) {
            duration = 'weeks';
        } else {
            duration = 'week';
        }
    }

    if(durationPeriod === 'm') {
        if(period > 1) {
            duration = 'months';
        } else {
            duration = 'month';
        }
    }
    return (period + ' ' + duration);
  }
}

export default App;
