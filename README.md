# AngularJS toArray Filter

Although AngularJS 1.x supports iterating over an object (keys and values), it is
not the preferred way of doing things. Moreover, filters like `filter` and `orderBy`
just don't work with objects; they are designed to work with arrays.

This filter can convert your objects into stable arrays that can then be filtered and
sorted using the standard AngularJS filters.

## Get It

The easiest way to install is using [bower][bower]:

```
bower install --save angular-toArrayFilter
```

Alternatively you can download from the GitHub project:
[https://github.com/petebacondarwin/angular-toArrayFilter](https://github.com/petebacondarwin/angular-toArrayFilter)

## Load It

Load the `toArrayFilter.js` file into your web app after loading `angular.js`

```html
<html>
  ...
  <head>
    ...
    <script src="angular.js"></script>
    <script src="bower_components/angular-toArrayFilter/toArrayFilter.js"></script>
    ...
  </head>
  ...
</html>
```

## Use It

Make sure that your AngularJS application references the `angular-toArrayFilter` module:

```
angular.module('myApp', ['angular-toArrayFilter']);
```

Now if you have an object that you wish to repeat over, just slip the `toArray` filter in
before you try sorting or filtering:

```html
<div ng-repeat="item in itemObj | toArray | orderBy : 'someProp'">
  {{ item.$key }} - {{ item.someProp }}
</div>
```

## How it works

The filter iterates over the object's keys and creates an array containing the value of each
property. By default, the filter also attaches a new property `$key` to the value containing
the original key that was used in the object we are iterating over to reference the property.


## Not adding the `$key` property

If you don't want the `$key` property to be attached to each of the property values, you simply
put an additional parameter on the `toArray` filter:

```html
<div ng-repeat="item in itemObj | toArray : false | orderBy : 'someProp'">
  {{ item.someProp }} (no $key available now)
</div>
```

## Using `$key` with non-objects

Non-objects such as strings and numbers cannot have a new `$key` property attached to them.
If the object properties you are iterating over are not objects then you must either disable
the `$key` property or the filter will replace the non-object with a new object of the form:
`{ $key: key, $value: value }`.


## Caveats

There are always issues when trying to iterate over properties in JavaScript and the `toArray`
filter has its own set of things to be aware of when using it:

* It only works with plain Objects - don't try to filter arrays and strings with it.
* If you don't disable it, the filter will modify each property value with a new `$key` property.
* This filter is not compatible with IE8. (It uses `Object.keys` and `Object.defineProperty` which
  don't work well or at all in Internet Explorer 8 (IE8).


## Example

Here is a fuller example of using the `toArray` filter on an object, to allow sorting and filtering
by a `date` property on each property of the original object. It also demonstrates how you can easily
update the original object and the array will stay in sync.

Check out the [Live Demo][live-demo]


**index.html:**

```html
<div ng-app="app">
  <div ng:controller="Main">
    <div ng:repeat="item in items | toArray | orderBy: 'date'">
      {{item.$key}}: {{item.date | date}}
      <button ng-click="remove(item)">Remove</button>
    </div>
    <button ng-click="add()">Add</button>
  </div>
</div>
```

**app.js**

```js
angular.module('app', [])

.controller('Main', function Main($scope) {
  $scope.nextKey = 4;
  $scope.items = {
    0: {date: new Date('12/23/2013')},
    1: {date: new Date('12/23/2011')},
    2: {date: new Date('12/23/2010')},
    3: {date: new Date('12/23/2015')}
  };

  $scope.remove = function(item) {
    delete $scope.items[item.$key];
  };

  $scope.add = function() {
    $scope.items[$scope.nextKey] = { date: new Date() };
    $scope.nextKey += 1;
  };
});
```

[bower]: https://bower.io
[live-demo]: http://plnkr.co/edit/G69YqKb9ag1qPLVqE6wz?p=preview