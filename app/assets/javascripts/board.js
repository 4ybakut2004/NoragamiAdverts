var Board = function(resources) {

	var object = new THREE.Object3D();

	var trunk;          // Столбик
	var board;          // Сама доска
	var adverts = [];   // Массив с объявлениями
	var roof;           // крышка у доски объявлений
	var circles = [];   // Лампочки
	var light;          // Свет

	// Предустановленные позиции объявлений
	var advertsPositions = [
		new THREE.Vector3(-0.04, 0.135, 0.0053),
		new THREE.Vector3(-0.02, 0.065, 0.0053),
		new THREE.Vector3(0.0, 0.135, 0.0053),
		new THREE.Vector3(0.02, 0.065, 0.0053),
		new THREE.Vector3(0.04, 0.135, 0.0053),
	];

	init();

	function init() {
		trunk = createTrunk();
		board = createBoard();
		roof = createRoof();
		light = createLight();

		circles.push(generationLightPoint(-0.03, 0.168, 0.015));
		circles.push(generationLightPoint(0.0, 0.168, 0.015));
		circles.push(generationLightPoint(0.03, 0.168, 0.015));

		object.add(trunk);
		object.add(board);
		object.add(roof);
		object.add(light);

		for(var i = 0; i < circles.length; i++) {
			object.add(circles[i]);
		}
	}

	function createTrunk() {
		var texture = resources.textures.tall.clone();
		texture.needsUpdate = true;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 5);
		texture.anisotropy = 16;

		var geometry = new THREE.CylinderGeometry( 0.005, 0.005, 0.25);
		var material = new THREE.MeshLambertMaterial( {map: texture} );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.receiveShadow = true;
		mesh.castShadow = true;

		return mesh;
	}

	function createBoard() {
		var texture = resources.textures.wood.clone();
		texture.needsUpdate = true;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 5);
		texture.anisotropy = 16;

		var mapHeight = resources.textures.wood_height.clone();
		mapHeight.wrapS = THREE.RepeatWrapping;
		mapHeight.wrapT = THREE.RepeatWrapping;
		mapHeight.repeat.set(2, 5);
		mapHeight.anisotropy = 16;
		
		var mapNormal = resources.textures.wood_normal.clone();
		mapNormal.wrapS = THREE.RepeatWrapping;
		mapNormal.wrapT = THREE.RepeatWrapping;
		mapNormal.repeat.set(2, 5);
		mapNormal.anisotropy = 16;
		var box = getBox({
			sizeX: 0.12,
			sizeY: 0.15,
			sizeZ: 0.01,
			texture: texture,
			bumpMap: mapHeight, 
			bumpScale: 0.5, 
			normalMap: mapNormal,
			shininess: 75, 
			specular: 0x000000, 
			wrapAround: true, 
			metal: true, 
			side: THREE.DoubleSide
		});

		box.position.y = 0.1;
		box.castShadow = true;
		box.receiveShadow = true;
		
		return box;
	}

	function createRoof() {
		var texture = resources.textures.wood.clone();
		texture.needsUpdate = true;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(5, 1);
		texture.anisotropy = 16;

		var mapHeight = resources.textures.wood_height.clone();
		mapHeight.wrapS = THREE.RepeatWrapping;
		mapHeight.wrapT = THREE.RepeatWrapping;
		mapHeight.repeat.set(5, 1);
		mapHeight.anisotropy = 16;
		
		var mapNormal = resources.textures.wood_normal.clone();
		mapNormal.wrapS = THREE.RepeatWrapping;
		mapNormal.wrapT = THREE.RepeatWrapping;
		mapNormal.repeat.set(5, 1);
		mapNormal.anisotropy = 16;
		var box = getBox({
			sizeX: 0.12,
			sizeY: 0.005,
			sizeZ: 0.04,
			texture: texture,
			bumpMap: mapHeight, 
			bumpScale: 0.5, 
			normalMap: mapNormal,
			shininess: 75, 
			specular: 0x000000, 
			wrapAround: true, 
			metal: true, 
			side: THREE.DoubleSide
		});

		box.position.y = 0.17;
		box.position.z += 0.02;
		box.castShadow = true;
		box.receiveShadow = true;
		
		return box;
	}

	function createLight() {
		var pointLight = new THREE.PointLight( 0xbbbb00, 2, 0.15 );
		pointLight.position.set( 0.0, 0.15, 0.015 );

		return pointLight;
	}

	function generationLightPoint(x, y, z){
		var circleGeometry = new THREE.SphereGeometry( 0.003, 0.003, 0.003);				
		var circle = new THREE.Mesh( circleGeometry, new THREE.MeshBasicMaterial({color: 0xbbbb00}));
		circle.position.y = y;
		circle.position.z = z;
		circle.position.x = x;
		return circle;
	}
	
	this.addAdvert = function(options) {
		// Достаем количество объявлений
		var advertsCount = adverts.length;
		// Смотрим, сколько максимум
		var maxAdverts = advertsPositions.length;

		var coords;
		var deleted;
		var advert = {
			object: undefined,
			info: undefined
		};

		// Создаем объявляшку
		if(options.object) {
			advert.object = options.object;
		} else {
			advert.object = createAdvert();
		}
		advert.info = options.info;

		// Если доска переполнена, отрываем старое объявление и смещаем все в его сторону
		if(advertsCount >= maxAdverts) {
			deleted = adverts.shift();
			object.remove(deleted.object);
			advertsCount--;

			// Смещаем объвяления
			for(var i = 0; i < advertsCount; i++) {
				adverts[i].object.position.x = advertsPositions[i].x;
				adverts[i].object.position.y = advertsPositions[i].y;
				adverts[i].object.position.z = advertsPositions[i].z;
			}
		}

		// Настраиваем координаты объявления
		advert.object.position.x = advertsPositions[advertsCount].x;
		advert.object.position.y = advertsPositions[advertsCount].y;
		advert.object.position.z = advertsPositions[advertsCount].z;

		object.add(advert.object);
		adverts.push(advert);

		return deleted;
	};

	function createAdvert() {
		var texture = resources.textures.message_on_board.clone();
		texture.needsUpdate = true;

		var advert = getPanel(0.03, 0.06, texture, 1.0, 1.0);
		advert.receiveShadow = true;

		return advert;
	}

	this.onDocumentMouseMove = function(raycaster) {
		var objects = [];
		for(var i = 0; i < adverts.length; i++) {
			objects.push(adverts[i].object);
		}

		var intersects = raycaster.intersectObjects(objects);
		var intersectObject;

		if(intersects.length > 0) {
			intersects[0].object.material.color = new THREE.Color(0.5, 1.0, 0.5);
			intersectObject = intersects[0].object;
		} else {
			for(var i = 0; i < adverts.length; i++) {
				adverts[i].object.material.color = new THREE.Color(1.0, 1.0, 1.0);
			}
		}

		for(var i = 0; i < adverts.length; i++) {
			if(adverts[i].object == intersectObject) {
				intersectObject = adverts[i].info;
			}
		}

		return intersectObject;
	};

	this.getObject = function() {
		return object;
	};
};