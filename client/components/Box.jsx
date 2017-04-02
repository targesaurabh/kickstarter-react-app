import React from 'react';
import ReactDOM from 'react-dom';

import Details from './Details.jsx';

export default class Box extends React.Component {

	constructor(props) {
	    super(props);
	}

	viewDetails(event){
		event.preventDefault();

		ReactDOM.render(
		  <Details data={this.props.data} backHandler={this.props.backHandler.bind(this)}/>,
		  document.getElementById('root')
		);

	}
	
	  render(props) {

	  	let urlPrefix = "http://starlord.hackerearth.com/kickstarter";
	  	let url = urlPrefix + this.props.data.url;

	  	let style = {	  		
	  		width 	: "400px",
	  		margin 	: "auto",
	  		marginBottom : "10px"
	  	};

	  	const floatRight = {
	  		float : "right"
	  	};
	
	    return (
			<div style={style}>			
				<div className='card' >
				  <div className='card-block'>
				    <h4 className='card-title'>{this.props.data.title}</h4>				    
				  </div>
				  <ul className='list-group list-group-flush'>
				  	<li className='list-group-item'>Pledge : {this.props.data["amt.pledged"]}</li>
				    <li className='list-group-item'>Backers : {this.props.data["num.backers"]}</li>
				    <li className='list-group-item'>End time : {this.props.data["end.time"]}</li>				    
				  </ul>
				  <div className='card-block'>
				    <a href={url} className='card-link' target='_blank'>URL</a>
				    <a href='#' onClick={this.viewDetails.bind(this)} className='card-link' target='_blank' style={floatRight}>Details</a>
				  </div>
				</div>
			</div> 
		);
	    
	  }
}