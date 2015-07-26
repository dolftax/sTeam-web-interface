// Helper functions

exports.toBeStringIfExists = function (val) {
  if (val) {
    expect(val).toEqual(jasmine.any(String))
  }
}

exports.toBeObjectIfExists = function (val) {
  if (val) {
    expect(val).toEqual(jasmine.any(Object))
  }
}

exports.toBeDateIfExists = function (val) {
  if (val) {
    var date = new Date(val)
    expect(date).toEqual(jasmine.any(Object))
  }
}
