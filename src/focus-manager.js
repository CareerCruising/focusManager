
angular.module('ccFocusManager', [])
  .directive('focusId', FocusId)
  .factory('FocusManagerService', FocusManagerService);

/**
 * @ngdoc service
 * @name FocusManagerService
 * @requires event
 * @description
 * FocusManagerService to register current element -- inside your controller/directive -- FocusManagerService.setCurrentFocusId(event);
 * FocusManagerService to get current element -- inside your controller/directive -- FocusManagerService.getCurrentFocusId();
 * @usage
 *  Inject FocusManagerService
 *  FocusManagerService.setCurrentFocusId(event);
 *  WARNING: Its your responsibility to set a fall back in case current target does not exist
 *  e.g. var body    = $document.find('body')[0];
 */

function FocusManagerService() {
  var currentEvent;
  var focusId;
  var service = {
    setCurrentFocusId: setCurrentFocusId,
    getCurrentFocusId: getCurrentFocusId
  };

  return service;

  function setCurrentFocusId(event) {
    /*jshint validthis:true */
    if (angular.isObject(event)) {
      setEvent(event);
      if (event.target && event.target.attributes.length > 0) {
        setFocusId(extractAttribute(event.target.attributes));
      } else {
        //No fallback currently
        //We could check for (event.currentTarget && event.currentTarget.attributes) -- which is {{parent of}} event.target
      }
    } else {
      //We will pass in blank objects -- to create a fallback
      setEvent({});
      setFocusId({});
    }
  }

  function getCurrentFocusId() {
    /*jshint validthis:true */
    return focusId;
  }


  //Helper methods
  function setEvent(event) {
    currentEvent   = event;
  }

  function setFocusId(id) {
    focusId        = id;
  }

  function extractAttribute(attributes) {
    var result;
    angular.forEach(attributes, function(node) {
      if(node.name === 'focus-id') {
        result = node.nodeValue;
      }
    });
    return result;
  }

}

FocusId.$inject = ['FocusManagerService'];
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
