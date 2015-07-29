var frisby = require('frisby')
var objUnit = require('./objUnit')
var config = angular.injector(['ng', 'module']).get('config')

frisby.create('Request `/home` returns proper JSON')
  .get(config.baseurl + 'rest.pike?request=/home')
  .expectStatus(200)
  .expectJSON({
    'request': '/home',
    'request-method': 'GET',
    'me': objUnit.testMeObj,
    'inventory': function (val) {
      val.forEach(function (e) {
        objUnit.testInventoryObj(e)
      })
    }
  })
  .toss()

frisby.create('Request `/home/:user` returns proper JSON')
  .get(config.baseurl + 'rest.pike?request=/home/dolftax')
  .expectStatus(200)
  .expectJSON({
    'request': '/dolftax',
    'request-method': 'GET',
    'me': objUnit.testMeObj,
    'inventory': function (val) {
      val.forEach(function (e) {
        objUnit.testInventoryObj(e)
      })
    }
  })
  .toss()
