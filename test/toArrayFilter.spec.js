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

  it("should handle undefined", inject(function(toArrayFilter) {
    var obj = undefined;
    expect(toArrayFilter(obj)).toBeUndefined();
  }));

  it("should not work with non-objects", inject(function(toArrayFilter) {
    var obj = 'some string';
    expect(function() {
      toArrayFilter(obj);
    }).toThrow();

    obj = 12345;
    expect(function() {
      toArrayFilter(obj);
    }).toThrow();
  }));
});