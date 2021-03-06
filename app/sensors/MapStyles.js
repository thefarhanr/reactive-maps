import { default as React, Component } from 'react';
import { render } from 'react-dom';
var helper = require('../middleware/helper.js');

export class MapStyles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
		this.handleSelect = this.handleSelect.bind(this);
	}
	componentDidMount() {
		let selectedValue = 0
		if(this.props.defaultSelected) {
			helper.mapStyles.forEach((style, index) => {
				if(style.key === this.props.defaultSelected) {
					selectedValue = index
				}
			})
		}
		this.setState({
			items: helper.mapStyles,
			selectedValue: selectedValue
		}, this.themeChanged);
	}
	// Handler function when a value is selected
	handleSelect(event) {
		this.setState({
			selectedValue: event.target.value
		}, function() {
			this.themeChanged(true)
		}.bind(this));
	}
	themeChanged(isExecute=false) {
		let style = helper.mapStyles[this.state.selectedValue].value;
		this.props.mapStyleChange(style)
	}
	render() {
		let options = this.state.items.map(function(item, index) {
			return <option value={index} key={index}>{item.key}</option>;
		});
		return (
			<div className="input-field mapStyles">
				<select className="browser-default" onChange={this.handleSelect} value={this.state.selectedValue} name="mapStyles" id="mapStyles">
					{options}
				</select>
			</div>
		);
	}

}

MapStyles.propTypes = {
};
// Default props value
MapStyles.defaultProps = {
	fieldName: 'MapStyles'
};
