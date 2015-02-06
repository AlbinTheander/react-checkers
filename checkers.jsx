Game = React.createClass({
	getInitialState: function() {
		var data = [];
		for(var y=0; y<8; y++)
			data[y] = ',,,,,,,'.split(',');
		return { player: 'red', data:data };
	},
	clickHandler: function(x,y) {
		var data = this.state.data;
		var player = this.state.player;
		if (data[y][x] == '') {
			data[y][x] = player;
			player = (player === 'red' ? 'white' : 'red');
			this.setState({player:player, data:data});
		}
	},
	render: function() {
		return (
			<div className="game">
				<h1>Checkers</h1>
				<Board data={this.state.data} clickHandler={this.clickHandler}/>
				<div>Next player: {this.state.player}</div>
			</div>
		);
	}
});

Board = React.createClass({
	render: function() {
		var clickHandler = this.props.clickHandler;
		return (
			<table className="board">
				<tbody>
				{this.props.data.map(function(row, y) {
					return (
						<tr>
							{row.map(function(cell, x) {
								return (
									<td>
										<Square x={x} y={y}
												player={cell}
												clickHandler={clickHandler} />
									</td>
								);
							})}
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	}
})

Square = React.createClass({
	clickHandler : function() {
		this.props.clickHandler(~~this.props.x, ~~this.props.y);
	},
	render: function() {
		var classString = (~~this.props.x + ~~this.props.y) % 2 == 0 ? 'white' : 'black';
		classString += ' square';

		var content = '';
		if (this.props.player) {
			content = (
				<svg height="50" width="50">
	  				<circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill={this.props.player} />
				</svg>
			)
		}

		return (
			<div className={classString} onClick={this.clickHandler}>
				{content}
			</div>
		);
	}
});