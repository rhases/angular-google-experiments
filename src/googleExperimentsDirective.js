angular.module('googleExperiments').directive(
    'variation',
    function(googleExperiments) {
        return {
            scope: {
                variationSelected: '='
            },
            link: function(scope, element, attr) {
                element.addClass('ng-cloak');
                scope.$watch(attr.variation, function googleExperimentsVariationWatchAction(value) {
                    googleExperiments.getVariation().then(function (variation) {
                        if (variation == value) {
                            element.removeClass('ng-cloak');
                            element.removeClass('ng-hide');
                            scope.variationSelected = variation
                        } else {
                            element.addClass('ng-hide');
                        }
                    });
                });
            }
        }
    }
);