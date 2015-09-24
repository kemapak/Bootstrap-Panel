/**
 * @ngdoc overview
 * @name ui.bootstrap.panel
 * @restirct E
 *
 * @description
 * AngularJS version of the panels directive.
 */
directiveModule.directive('uiPanel', [function () {

    return {
        restrict: 'E', transclude: true, replace: true, scope: {
            id: '@', class: '=state', config: '=', show: '='
        }, template: '<div class="panel panel-{{class}}" data-ng-transclude=""></div>', controller: function ($scope, $element, $attrs) {

            var toggleHeader = function(isShown) {

                if (null !== $element[0].querySelector('.panel > .panel-heading')) {

                    var collapseIcon = angular.element($element[0].querySelector('.panel > .panel-heading > div.row > div > span.glyphicon'));

                    if (!isShown) {

                        collapseIcon.removeClass('glyphicon-chevron-right');
                        collapseIcon.addClass('glyphicon-chevron-down');
                    } else {

                        collapseIcon.removeClass('glyphicon-chevron-down');
                        collapseIcon.addClass('glyphicon-chevron-right');
                    }
                }
            };

            var toggleBody = function (isShown) {

                if (null !== $element[0].querySelector('.panel > .panel-body')) {

                    var body = angular.element($element[0].querySelector('.panel > .panel-body'));

                    if (!isShown) {

                        body.removeClass('hidden fade');
                        body.addClass('show');
                    } else {

                        body.removeClass('show');
                        body.addClass('hidden fade');
                    }
                }
            };

            var toggleFooter = function (isShown) {

                if (null !== $element[0].querySelector('.panel > .panel-footer')) {

                    var footer = angular.element($element[0].querySelector('.panel > .panel-footer'));

                    if (!isShown) {

                        footer.removeClass('hidden fade');
                        footer.addClass('show');
                    } else {

                        footer.removeClass('show');
                        footer.addClass('hidden fade');
                    }
                }
            };

            var togglePanel = function (isShown) {

                toggleHeader(isShown);
                toggleBody(isShown);
                toggleFooter(isShown);
            }

            // Variable in closure scope (private).
            var _show = true;

            // Get the
            this.isItVisible = function () {

                return _show;
            }

            this.showPanel = function () {

                _show = true;

                togglePanel(_show);
            }

            this.hidePanel = function () {

                _show = false;

                togglePanel(_show);
            }

            this.togglePanel = function () {

                _show = !_show;

                togglePanel(_show);
            }

            // If show is defined in scope use it. Otherwise assume it is true (_show is initialized above).
            if (undefined !== typeof $scope.show) {

                _show = $scope.show;
            }
        },

        link: function (scope, element, attrs) {

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
directiveModule.directive('uiPanelHeader', function () {

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            title: '@', config: '='
        },
        template:   '<div class="panel-heading">' +
                    '    <div class="row">' +
                    '        <div class="col-xs-6" data-ng-click="togglePanel();"><span class="glyphicon glyphicon-chevron-right"></span>&nbsp;<span class="panel-title">{{title}}</span></div>' +
                    '        <div class="col-xs-6"><div class="pull-right" data-ng-transclude=""></div></div>' +
                    '    </div>' +
                    '</div>',

        link: function (scope, element, attrs, panelController) {

            if (!panelController.isItVisible()) {

                panelController.hidePanel();
            }

            scope.togglePanel = function () {

                panelController.togglePanel();
            }
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
directiveModule.directive('uiPanelBody', function () {

    return {
        require: '^uiPanel', restrict: 'E', transclude: true, replace: true, scope: {
            title: '@', config: '=', class: '@'
        }, template: '<div class="panel-body" data-ng-transclude="">',

        link: function (scope, element, attrs, panelController) {

            if (!panelController.isItVisible()) {

                panelController.hidePanel();
            }
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
directiveModule.directive('uiPanelFooter', function () {

    return {
        require: '^uiPanel', restrict: 'E', transclude: true, replace: true, scope: {
            config: '=', class: '@'
        }, template: '<div class="panel-footer" data-ng-transclude="">',

        link: function (scope, element, attrs, panelController) {

        }

    };
});
