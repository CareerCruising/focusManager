/**
 * Created by george.batalinski on 4/6/2015.
 */

'use strict';

angular.module('ccFocusManager')
  .directive('focusId', FocusId);

function FocusId(FocusManagerService) {

  /**
   * @ngdoc directive
   * @name focusId
   * @requires FocusManagerService
   * @restrict A
   * @description
   *
   * dataFocusId will focus on itself
   *   #) directive watches a value inside a service
   *      #) If the elements ID is the same as the currentFocusableID -- ACTION: elem[0].focus()
   * @usage
   *  <button type="button" class="btn-dark"
   *    ng-click="about.openMyExpPD($event)"
   *    ng-enter="about.openMyExpPD($event)"
   *    data-focus-id="aboutGoToOpenExp">
   */

  var directive = {
    restrict: 'A',
    link: link
  };
  return directive;

  function link(scope, elem, attrs) {
    scope.$watch(function() {
      return FocusManagerService.getCurrentFocusId();
    }, function(newValue) {
      if (attrs.focusId) {
        if (attrs.focusId === newValue) {
          elem[0].focus();
        }
      }
    });

  }
}
