var BoardsController = function(resources) {

	var object = new THREE.Object3D();

	var boardLeft, boardRight;      // доски с объявлениями
	var advertsCount = 0;
	var advertsOnBoard = 5;

	init();

	function init() {
		initBoards();

		object.add(boardLeft.getObject());
		object.add(boardRight.getObject());
	}

	function initBoards() {
		boardLeft = new Board(resources);
		boardLeft.getObject().position.z = -0.3;
		boardLeft.getObject().position.x = -0.3;
		boardLeft.getObject().position.y = -0.1;
		boardLeft.getObject().rotation.y = 3.14/2.5;

		boardRight = new Board(resources);
		boardRight.getObject().position.z = -0.3;
		boardRight.getObject().position.x = 0.3;
		boardRight.getObject().position.y = -0.1;
		boardRight.getObject().rotation.y = -3.14/2.5;
	}

	this.getObject = function() {
		return object;
	};

	this.addAdvert = function() {
		if(advertsCount < advertsOnBoard) {
			boardLeft.addAdvert();
		}

		if(advertsCount >= advertsOnBoard && advertsCount < advertsOnBoard * 2) {
			boardRight.addAdvert();
		}

		if(advertsCount == advertsOnBoard * 2) {
			var oldAdvert = boardRight.addAdvert();
			boardLeft.addAdvert(oldAdvert);
		}

		if(advertsCount < advertsOnBoard * 2) {
			advertsCount++;
		}
	};

};