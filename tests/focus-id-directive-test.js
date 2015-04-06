/**
 * Created by george.batalinski on 4/6/2015.
 */


'use strict';


describe('Directive: focusId', function () {

  // load the directive's module
  beforeEach(module('ccFocusManager'));

  var element;
  var scope;
  var render;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    var compileFn = $compile('<div id="ThingsILike" ng-click="about.openTILPD($event)" ng-enter="about.openTILPD($event)" focus-id="aboutGoToOpenTILPD">');
    render = function () {
      element = compileFn(scope);
      $rootScope.$digest();
    }
  }));

  it('should be able to get an attribute in focus-id', function () {
    render();
    expect(element).to.have.length(1);
  });


});
