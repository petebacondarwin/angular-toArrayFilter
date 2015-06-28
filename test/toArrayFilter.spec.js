describe("toArrayFilter", function() {

  beforeEach(module('angular-toArrayFilter'));


  it("should convert an object to an array of values", inject(function(toArrayFilter) {
    var obj = {
      a: { name: 'A' },
      b: { name: 'B' },
      c: { name: 'C' }
    };
    expect(toArrayFilter(obj)).toEqual([
      { $key: 'a', name: 'A' },
      { $key: 'b', name: 'B' },
      { $key: 'c', name: 'C' }
    ]);
  }));


  it("should not include $key if `addKey` param is false", inject(function(toArrayFilter) {
    var obj = {
      a: { name: 'A' },
      b: { name: 'B' },
      c: { name: 'C' }
    };
    expect(toArrayFilter(obj, false)).toEqual([
      { name: 'A' },
      { name: 'B' },
      { name: 'C' }
    ]);
  }));


  it("should work with non-object properties if $key is disabled", inject(function(toArrayFilter) {
    var obj = {
      a: 'A',
      b: 'B',
      c: 'C'
    };
    expect(toArrayFilter(obj, false)).toEqual([
      'A',
      'B',
      'C'
    ]);

  }));


  it("should create new objects ({$key:...,$value:...}) from non-object properties if `addKey` is not false", inject(function(toArrayFilter) {
    var obj = {
      a: 'A',
      b: 'B',
      c: 'C'
    };
    expect(toArrayFilter(obj)).toEqual([
      { $key: 'a', $value: 'A' },
      { $key: 'b', $value: 'B' },
      { $key: 'c', $value: 'C' }
    ]);
  }));


  it("should work with an array", inject(function(toArrayFilter) {
    var obj = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' }
    ];
    expect(toArrayFilter(obj)).toEqual([
      { $key: '0', name: 'A' },
      { $key: '1', name: 'B' },
      { $key: '2', name: 'C' }
    ]);
  }));

  it("should handle invalid inputs", inject(function(toArrayFilter) {
    expect(toArrayFilter(undefined)).toBeUndefined();
    expect(toArrayFilter(null)).toBe(null);
    expect(toArrayFilter('some string')).toBe('some string');
    expect(toArrayFilter(12345)).toBe(12345);
  }));

});