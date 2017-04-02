import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import Box from './Box.jsx';

function SearchListComponent(props){
	const style = {
		border : "1px solid rgba(0, 0, 0, 0.15)"
	}

	return (								  
		<div className='searchedElement' style={style} onClick={props.onClickEvent}>{props.title}</div>				 
	);
}

export default class RootComponent extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
			data 		 : this.props.data,
			filteredData : this.props.data,
			searchedElements : []
	    };

	    this.searchByTitle = this.searchByTitle.bind(this);	 
	    this.backHandler   = this.backHandler.bind(this);   

	    this.initiateServerCall();

	}

	initiateServerCall(){

		axios.get('http://starlord.hackerearth.com/kickstarter')
		.then(response => {
			console.log(response);

			this.setState({data : response.data, filteredData : response.data});			

		});

	}

	searchByTitle(){

		let that = this;
		let searchBoxValue = that.searchBoxInput.value.toLowerCase();	

		this.state.searchedElements = [];
					
		let filteredList = this.state.data.map(function(element){
			if(searchBoxValue.length > 3){
				if((element.title.toLowerCase().indexOf(searchBoxValue) !== -1)){
					that.state.searchedElements.push(element);							
				}				
			}
			return element;	
		});

		this.setState({filteredData : filteredList});
		
	}

	backHandler(){
		ReactDOM.render(
		  <RootComponent data={this.state.data}/>,
		  document.getElementById('root')
		);
	}

	clickedElementFromDropDown(data, event){

		let foundElement = this.state.data.find(function(element){
			return element['s.no'] == data
		});

		this.searchBoxInput.value = foundElement.title;

		this.setState({filteredData : [foundElement], searchedElements : []});

	}

	render() {

		const style = {	 	
	  		width 	: "400px",
	  		margin 	: "auto",
	  		marginBottom : "10px"
	  	};

	  	var that = this;
		var namesList = this.state.filteredData.map(function(element){
			if(element)
				return <Box key={element['s.no']} data={element} backHandler={that.backHandler}/>;
		});

		console.log(namesList);

		return (
			<div>				
				<div className='form-group' style={style}>
				  <label>Search by title:</label>
				  <input type='text' className='form-control' ref={(input) => this.searchBoxInput = input} id='searchBox' onKeyUp={this.searchByTitle}/>
				  <div>
					  {this.state.searchedElements.map((data)=>{
					  	return <SearchListComponent key={data['s.no']} title={data.title} onClickEvent={this.clickedElementFromDropDown.bind(this, data['s.no'])}/>
					  })}
				  </div>
				</div>
				{namesList.length ? namesList : <div style={style}>Fetching data...</div>}
			</div>
		);
	}

}