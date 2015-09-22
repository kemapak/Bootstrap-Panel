/**
 * @ngdoc overview
 * @name ui.bootstrap.panel
 * @restirct E
 *
 * @description
 * AngularJS version of the panels directive.
 */
directiveModule.directive('uiPanel', ['panelService', function(panelService){

    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            id: '@',
            config: '='
        },
        template: '<div class="panel" data-ng-transclude=""></div>',
        controller: function($scope) {

            this.showPanel = function() {

                $scope.show = true;
                return 'show';
            }

            this.hidePanel = function() {

                $scope.show = false;
                return 'hidden';
            }

            this.alert = function() {
                alert('test');
            }
        },

        link: function(scope, element, attrs) {

            // Decorate the element with the ID if exists.
            if (undefined !== typeof scope.id && scope.id.trim().length > 0) {

                element.attr('id', scope.id);
            }
        }
    };

}]);

/**
 * @ngdoc overview
 * @name ui.bootstrap.panel.header
 * @restirct E
 *
 * @description
 * AngularJS version of the panels header directive.
 */
directiveModule.directive('uiPanelHeader', function(){

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            title: '@',
            config: '=',
            class: '@'
        },
        template: '<div class="panel-heading">' +
                  '    <div class="col-sm-6"><h5><span class="glyphicon glyphicon-chevron-right"></span>{{title}}</h5></div>' +
                  '    <div class="col-sm-6" data-ng-transclude=""></div>' +
                  '</div>',

        link: function(scope, element, attrs, panelController) {



            panelController.alert();

            //element[0].appendChild(titleElement);


        }

    };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.panel.header
 * @restirct E
 *
 * @description
 * AngularJS version of the panels header directive.
 */
directiveModule.directive('uiPanelBody', function(){

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            title: '@',
            config: '=',
            class: '@'
        },
        template: '<div class="panel-body" data-ng-transclude="">',

        link: function(scope, element, attrs, panelController) {






        }

    };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.panel.header
 * @restirct E
 *
 * @description
 * AngularJS version of the panels footer directive.
 */
directiveModule.directive('uiPanelFooter', function(){

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            config: '=',
            class: '@'
        },
        template: '<div class="panel-footer" data-ng-transclude="">',

        link: function(scope, element, attrs, panelController) {



            //panelController.alert();

            //element[0].appendChild(titleElement);


        }

    };
});
