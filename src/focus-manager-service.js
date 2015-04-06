/**
 * Created by george.batalinski on 4/6/2015.
 */

'use strict';

angular.module('ccFocusManager')
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
