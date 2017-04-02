import React from 'react';
import ReactDOM from 'react-dom';

export default class Details extends React.Component {

	render(props){
		return (								  
			<div >			
				<div className='card' >
				  <div className='card-block'>
				    <h4 className='card-title'>{this.props.data.title}</h4>				    
				  </div>			  
				  <div className='card-block'>
				    <a href='#' className='card-link' onClick={this.props.backHandler}>Back</a>			    
				  </div>
				</div>
			</div> 			 
		)
	}
}



