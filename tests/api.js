var frisby = require("frisby"),
    objUnit = require("./objUnit"),
    helper = require("./helpers"),
    config = angular.injector(["ng", "module"]).get("config");

frisby.create("Request `/home` returns proper JSON")
    .get(config.baseurl + "rest.pike?request=/home")
    .expectStatus(200)
    .expectJSON({
        "request": "/home",
        "request-method": "GET",
        "me": testMeObj
    })
.toss();

frisby.create("Request `/home/:user` returns proper JSON")
    .get(config.baseurl + "rest.pike?request=/home/dolftax")
    .expectStatus(200)
    .expectJSON({
        "request": "/dolftax",
        "request-method": "GET",
        "me": testMeObj
    })
.toss();

function testEvent(e) {
  expect(e['class']).toEqual( jasmine.any(String) );
  expect(e.title).toEqual( jasmine.any(String) );
  expect(e.name).toEqual( jasmine.any(String) );
  expect(e.id).toEqual( jasmine.any(String) );
  expect(e.path).toEqual( jasmine.any(String) );
  expect(e.type).toEqual( jasmine.any(String) );

  expect(e.oid).toEqual( jasmine.any(Number) );

  toBeStringIfExists( e.description );
  toBeStringIfExists( e.eventid );
  toBeStringIfExists( e.category );
  toBeStringIfExists( e.owner );
  toBeStringIfExists( e.address );
  toBeStringIfExists( e.city );
  toBeStringIfExists( e['time'] );

  toBeDateIfExists( e.date );

  toBeObjectIfExists( e.events );

  if ( e.schedule ) {
    e.schedule.forEach(function(schedule) {
      expect( schedule.type ).toEqual( jasmine.any(String) );
      expect( schedule.name ).toEqual( jasmine.any(String) );
      expect( schedule.title ).toEqual( jasmine.any(String) );
      expect( schedule.id ).toEqual( jasmine.any(String) );
      expect( schedule.path ).toEqual( jasmine.any(String) );
      expect( schedule['class'] ).toEqual( jasmine.any(String) );
      expect( schedule.oid ).toEqual( jasmine.any(Number) );

      toBeStringIfExists( schedule.address )

      toBeDateIfExists( schedule.date );
    });
  }
  
  if ( e.keywords ) {
    e.keywords.forEach(function(word) {
      expect( word ).toEqual( jasmine.any(String) );
    })
  };
}
