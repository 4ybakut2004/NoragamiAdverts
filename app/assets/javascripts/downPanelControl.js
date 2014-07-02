/**
* отвечает за события, иницилизацию и прочие штуки нижней панели
* @nameAudio - название трека и путь к нему
*/

function controlPage($scope){
	$scope.nameDialog = [{id: '#addAdvent', width: 481, height: 306, resizable: false, opened: false},
				  {id: '#editting', width: 300, height: 100, resizable: false, opened: false},
				  {id: '#avtor', width: 400, height: 130, resizable: false, opened: false},
				  {id: '#baner', width: 300, height: 200, resizable: false, opened: false}];
				
	$scope.sound = new Sound(['./audio/end.ogg']);
	$scope.sound.play();
	$scope.sound.setVolume(1);
	
	$( "#slider-range-max" ).slider({
	  range: "max",
	  min: 0,
	  max: 10,
	  value: 1,
	  slide: function( event, ui ) {
		//ui.value - это значение будет устанавливаться громкостью
		$scope.sound.setVolume(ui.value*0.1);
	  }
	});
	
	$( document ).tooltip();
		
	$scope.setPage = function(param){
		$( $scope.nameDialog[param].id ).dialog({width: $scope.nameDialog[param].width, height: $scope.nameDialog[param].height, resizable: $scope.nameDialog[param].resizable});
		$scope.nameDialog[param].opened = true;
		
		angular.forEach($scope.nameDialog, function(dialog) {
		  if(dialog.id != $scope.nameDialog[param].id && dialog.opened) {
		  	$( dialog.id ).dialog('close');
		  	dialog.opened = false;
		  }
		});
	}
	
	$scope.closePage = function(param){
		$( $scope.nameDialog[param].id ).dialog('close');
	}
}