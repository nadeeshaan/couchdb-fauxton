define([
	"api",
	"react"
	], function (FauxtonAPI, React) {

		var AssignmentList = React.createClass({
			render: function() {
				var assignments = this.props.assignments.map(function(assignment) {
					return <li key={assignment.id}>
					{assignment.name} - {assignment.points} points
					</li>;
				});
				return <ul>{assignments}</ul>;
			}
		});

		var App = React.createClass({
			getInitialState: function() {
				return {assignments: [] };
			},

			addAssignment: function(assignment) {
				console.log(assignment);
				var newAssignments = this.state.assignments.concat([assignment]);
				this.setState({ assignments: newAssignments});
			},

			render: function() {
				return (
					<div>
					<h1>Assignment Form</h1>

				{/* okay, here it is */}
				<AssignmentForm onCreate={this.addAssignment}/>

				<AssignmentList assignments={this.state.assignments}/>
				</div>
				);
			}
		});

		var ContentToggle = React.createClass({

			getInitialState: function() {
				return {
					showDetails: false
				};
			},

			handleClick: function(event) {
				this.setState({
					showDetails: !this.state.showDetails
				});
				this.refs.details.getDOMNode().focus();
			},

			render: function() {
				var details;
				var summaryClassName = 'ContentToggle__Summary';

				if (this.state.showDetails) {
					details = this.props.children;
					summaryClassName += ' ContentToggle__Summary--open';
				}

				return (
					<div className="ContentToggle">
					<div tabIndex="0" onClick={this.handleClick} className={summaryClassName}>
					{this.props.summary}
					</div>
					<div ref="details" tabIndex="-1" className="ContentToggle__Details">
					{details}
					</div>
					</div>
					);
			}

		});

		var guid = 0;

		var AssignmentForm = React.createClass({

			handleSubmitClick: function(event){
				// event.preventDefault();
				// var name = this.refs.name.getDOMNode();
				// var points = this.refs.points.getDOMNode();

			 //    // call the "custom event" with `this.props.onCreate()`.
			 //    this.props.onCreate({
			 //    	id: ++guid,
			 //    	name: name.value,
			 //    	points: points.value
			 //    });

			 //    this.getDOMNode().reset();
			 //    name.focus();

			 	ActionList.addAssignment2({
			 		id: 1,
			 		name: "nadeeshaan",
			 		points: 12
			 	});
			},

			render: function(){
				return(

					<form onSubmit = {this.handleSubmitClick}>

					<legend>New Assignment</legend>
					<p>
					<label htmlFor="name">Assignment Name</label><br/>
					<input id="name" ref="name"/>
					</p>

					<p>
					<label htmlFor="points">Points Possible</label><br/>
					<input id="points" ref="points"/>
					</p>

					<p>
					<button type="submit">Create</button>
					</p>

					</form>

					);
			}
		});

		var ActionList = {
			addAssignment2: function(assignment){
				alert(assignment);
			}
		};

		return {
			renderSAMPLE: function (el) {
				React.render(<App />, el);
			},
		};
	});