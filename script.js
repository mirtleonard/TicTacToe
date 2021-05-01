var grid = [["", "", ""],["", "", ""],["", "", ""]];
var player = 'O', moves = 0, line, column;

function winner(line, column) {
	if (line == -1) {
		for (line = 0; line < 3; line++) {
			$("#" + line + column).removeClass("bg-light");
			$("#" + line + column).addClass("bg-success");
		}
		line--;
	} else if (column == -1) {
			for (column = 0; column < 3; column++) {
				$("#" + line + column).removeClass("bg-light");
				$("#" + line + column).addClass("bg-success");
			}
			column--;
	} else if (column == 0) {
			while (column < 3) {
				$("#" + line + column).removeClass("bg-light");
				$("#" + line + column).addClass("bg-success");
				column++; line++;
			}
			line--; column--;
	} else {
		while (line < 3) {
			$("#" + line + column).removeClass("bg-light");
			$("#" + line + column).addClass("bg-success");
			column--;
			line++;
		}
		column++; line--;
	}
	return grid[line][column];
}

function LinesAndColumns() {
	var win1, win2;
	for (var i = 0; i < 3; i++) {
		win1 = win2 = 1;
		for (var j = 1; j < 3; j++) {
			if (grid[i][j] != grid[i][j - 1])
				win1 = 0;
			if (grid[j][i] != grid[j - 1][i])
				win2 = 0;
		}
		if (win1 == 1 && grid[i][0] != "")
			return winner(i, -1);
		else if (win2 == 1 && grid[0][i] != "")
			return winner(-1, i);
	}
	return "";
}

function diagonals() {
	win1 = win2 = 1;
	for (var i = 1; i < 3; i++) {
		if (grid[i - 1][i - 1] != grid[i][i])
			win1 = 0;
		if (grid[i][2 - i] != grid[i - 1][2 - i + 1])
			win2 = 0;
	}
	if (win1 == 1 && grid[0][0] != "")
		return winner(0, 0);
	if (win2 == 1 && grid[0][2] != "")
		return winner(0, 2);
	return "";
}

function checkState() {
		var win = LinesAndColumns();
		if (win == "")
				win = diagonals();
		if (win == "" && moves == 9)
			$("#output").html("Tie!");
		else if (win != "")
			$("#output").html(win + " has won!");
}



function changePlayer() {
	if (player == "X")
		player = '0';
	else
		player = 'X';
}

function change(id) {
	if ($("#" + id).find('h1').html() != "")
		return;
	moves++;
	changePlayer();
	$("#" + id).find('h1').html(player);
	grid[id[0] - '0'][id[1] - '0'] = player;
	checkState();
}
