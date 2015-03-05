angular.module('angular-toArrayFilter', [])

.filter('toArray', function () {
  return function (obj, addKey) {
    if ( obj === undefined ) {
      return undefined;
    }

    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        if (typeof obj[key] === "object") {
          return Object.defineProperty(obj[key], '$key', { enumerable: false, value: key});
        } else {
          return obj[key];
        }
      });
    }
  };
});
