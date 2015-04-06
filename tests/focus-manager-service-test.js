/**
 * Created by george.batalinski on 4/6/2015.
 */


'use strict';



describe('Service: FocusManagerService', function () {
  var FocusManagerService;
  var attribute = [{name: 'class'}, {name: 'ng-show'}, {name: 'ng-click'}, {name: 'ng-enter'}, {name: 'focus-id', nodeValue: 'aboutGoToQuiz'}, {name: 'tabindex'}, {name: 'aria-hidden'}];
  var event = {target: {attributes : attribute}};

  beforeEach(module('ccFocusManager'));


  beforeEach(function (_FocusManagerService_) {
    // Load the service's module
      FocusManagerService = _FocusManagerService_;
  });

  describe('the service api', function () {

    it('should exist', function () {
      expect(!!FocusManagerService).to.be.true;
    });

    it('should extract attributes from a nodeMap', function() {
      FocusManagerService.setCurrentFocusId(event);
      expect(FocusManagerService.getCurrentFocusId()).to.equal('aboutGoToQuiz');
    });

    it('should should fail if no attributes provided nodeMap', function() {
      FocusManagerService.setCurrentFocusId([]);
      expect(FocusManagerService.getCurrentFocusId()).to.be.undefined;
    });

  });

});