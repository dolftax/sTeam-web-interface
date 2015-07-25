// Unit tests for Objects

exports.testMeObj = function(me) {
  expect(me.name).toEqual(jasmine.any(String));
  expect(me.documents).toEqual(jasmine.any(Number));
  expect(me.id).toEqual(jasmine.any(String));
  expect(me.path).toEqual(jasmine.any(String));
  expect(me.description).toEqual(jasmine.any(String));
  expect(me.vsession).toEqual(jasmine.any(String));
  expect(me["class"]).toEqual(jasmine.any(String));
  expect(me.oid).toEqual(jasmine.any(Number));
  expect(me.links).toEqual(jasmine.any(Number));
  expect(me.icon).toBeDefined();
  expect(me.fullname).toEqual(jasmine.any(String));
};

exports.testInventoryObj = function(e) {
  expect(e.class).toEqual(jasmine.any(String));
  expect(e.name).toEqual(jasmine.any(String));
  expect(e.oid).toEqual(jasmine.any(Number));
  expect(e.path).toEqual(jasmine.any(String));
  expect(e.type).toEqual(jasmine.any(String));

  expect(e.oid).toEqual( jasmine.any(Number));

  toBeStringIfExists(e.description);
  toBeStringIfExists(e.eventid);
  toBeStringIfExists(e.category);
  toBeStringIfExists(e.owner);
  toBeStringIfExists(e.address);
  toBeStringIfExists(e.city);
  toBeStringIfExists(e["time"]);
  toBeDateIfExists(e.date);
  toBeObjectIfExists(e.events);

  if ( e.schedule ) {
    e.schedule.forEach(function(schedule) {
      expect(schedule.type).toEqual(jasmine.any(String));
      expect(schedule.name).toEqual(jasmine.any(String));
      expect(schedule.title).toEqual(jasmine.any(String));
      expect(schedule.id).toEqual(jasmine.any(String));
      expect(schedule.path).toEqual(jasmine.any(String));
      expect(schedule["class"]).toEqual(jasmine.any(String));
      expect(schedule.oid).toEqual(jasmine.any(Number));

      toBeStringIfExists(schedule.address)

      toBeDateIfExists(schedule.date);
    });
  }
  
  if (e.keywords) {
    e.keywords.forEach(function(word) {
      expect(word).toEqual(jasmine.any(String));
    })
  };
}
