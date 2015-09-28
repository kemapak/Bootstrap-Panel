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
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            id: '@',
            class: '=contextualClass',
            show: '='
        },
        template: '<div class="panel" data-ng-class="getPanelClass()" data-ng-transclude=""></div>',
        controller: function ($scope, $element) {

            // By default the panel will be shown.
            var _show = true;

            // If show is defined in scope use it. Otherwise assume it is true and the collapse functionality disabled.
            if ('undefined' !== typeof $scope.show) {

                _show = $scope.show;
            }

            var _collapsible = ('boolean' === typeof $scope.show);

            var _toggleHeader = function(isShow) {

                var _SHOW_ICON_CLASS = 'glyphicon-triangle-bottom';

                var _HIDE_ICON_CLASS = 'glyphicon-triangle-top';

                if (null !== $element[0].querySelector('.panel > .panel-heading') && _collapsible) {

                    var collapseIcon = angular.element($element[0].querySelector('.panel > .panel-heading > div.row > div > span.glyphicon'));

                    if (isShow) {

                        collapseIcon.removeClass(_HIDE_ICON_CLASS);
                        collapseIcon.addClass(_SHOW_ICON_CLASS);
                    } else {

                        collapseIcon.removeClass(_SHOW_ICON_CLASS);
                        collapseIcon.addClass(_HIDE_ICON_CLASS);
                    }
                }
            };

            var _toggleBody = function (isShow) {

                if (null !== $element[0].querySelector('.panel > .panel-body')) {

                    var body = angular.element($element[0].querySelector('.panel > .panel-body'));

                    if (isShow) {

                        body.removeClass('hidden fade');
                        body.addClass('show');
                    } else {

                        body.removeClass('show');
                        body.addClass('hidden fade');
                    }
                }
            };

            var _toggleFooter = function (isShow) {

                if (null !== $element[0].querySelector('.panel > .panel-footer')) {

                    var footer = angular.element($element[0].querySelector('.panel > .panel-footer'));

                    if (isShow) {

                        footer.removeClass('hidden fade');
                        footer.addClass('show');
                    } else {

                        footer.removeClass('show');
                        footer.addClass('hidden fade');
                    }
                }
            };

            var togglePanel = function (isShown) {

                _toggleHeader(isShown);
                _toggleBody(isShown);
                _toggleFooter(isShown);
            };

            // Get if the panel will be initially be shown.
            this.isItVisible = function () {

                return _show;
            };

            //Get if the panel is collapsible.
            this.isItCollapsible = function() {

                return _collapsible;
            };

            this.showPanel = function () {

                _show = true;

                togglePanel(_show);
            };

            this.hidePanel = function () {

                _show = false;

                togglePanel(_show);
            };

            this.togglePanel = function () {

                _show = !_show;

                togglePanel(_show);
            };
        },

        link: function (scope, element, attrs, panelController) {

            scope.getPanelClass = function() {

                if ('undefined' === typeof scope.class) {

                    return 'panel-default';
                } else {

                    return scope.class;
                }
            }

            // Initially show or hide panel.
            if (panelController.isItVisible()) {

                panelController.showPanel();
            } else {

                panelController.hidePanel();
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
directiveModule.directive('uiPanelHeader', function () {

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            title: '@'
        },
        template:   '<div class="panel-heading">' +
                    '    <div class="row">' +
                    '        <div class="col-xs-6" data-ng-click="togglePanel();"><span class="glyphicon"></span>&nbsp;<span class="panel-title">{{title}}</span></div>' +
                    '        <div class="col-xs-6"><div class="pull-right" data-ng-transclude=""></div></div>' +
                    '    </div>' +
                    '</div>',

        link: function (scope, element, attrs, panelController) {

            scope.togglePanel = function () {

                if (!panelController.isItCollapsible()) {
                    return true;
                }

                panelController.togglePanel();
            }
        }

    };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.panel.body
 * @restirct E
 *
 * @description
 * AngularJS version of the panels header directive.
 */
directiveModule.directive('uiPanelBody', function () {

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {},
        template: '<div class="panel-body" data-ng-transclude=""></div>'
    };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.panel.footer
 * @restirct E
 *
 * @description
 * AngularJS version of the panels footer directive.
 */
directiveModule.directive('uiPanelFooter', function () {

    return {
        require: '^uiPanel',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {},
        template: '<div class="panel-footer" data-ng-transclude=""></div>'
    };
});
