// Unit tests for Objects

exports.testMeObj = function (me) {
  expect(me.name).toEqual(jasmine.any(String))
  expect(me.documents).toEqual(jasmine.any(Number))
  expect(me.id).toEqual(jasmine.any(String))
  expect(me.path).toEqual(jasmine.any(String))
  expect(me.description).toEqual(jasmine.any(String))
  expect(me.vsession).toEqual(jasmine.any(String))
  expect(me['class']).toEqual(jasmine.any(String))
  expect(me.oid).toEqual(jasmine.any(Number))
  expect(me.links).toEqual(jasmine.any(Number))
  expect(me.icon).toBeDefined()
  expect(me.fullname).toEqual(jasmine.any(String))
}

exports.testInventoryObj = function (e) {
  expect(e.class).toEqual(jasmine.any(String))
  expect(e.name).toEqual(jasmine.any(String))
  expect(e.description).toEqual(jasmine.any(String))
  expect(e.oid).toEqual(jasmine.any(Number))
  expect(e.path).toEqual(jasmine.any(String))

  if (e.class === 'Room') {
    expect(e.documents).toEqual(jasmine.any(Number))
  }

  if (e.class === 'Document') {
    expect(e.mime_type).toEqual(jasmine.any(String))
    expect(e.size).toEqual(jasmine.any(Number))

    var reMimeType = /\.(\w+)$/
    var reName = /\/(\w+)$/
    expect(reMimeType.exec(e.mime_type)).toEqual(reName.exec(e.name))
  }
}
