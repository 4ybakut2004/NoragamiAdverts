noragamiAdverts.factory('Advert', ['$resource', function($resource) {
  function Advert() {
    this.service = $resource('/notices/:advertId.json',
                             {advertId: '@id'});
  }

  Advert.prototype.all = function() {
    return this.service.query();
  };

  Advert.prototype.get = function(id) {
    return this.service.get({advertId: id});
  };

  Advert.prototype.create = function(attr) {
    return this.service.save(attr);
  };

  return new Advert();
}]);