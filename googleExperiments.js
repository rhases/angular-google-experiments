angular.module('googleExperiments', ['angularLoad']);
;
angular.module('googleExperiments').directive(
    'variation',
    ['googleExperiments', function(googleExperiments) {
        return function(scope, element, attr) {
            element.addClass('ng-cloak');
            scope.$watch(attr.variation, function googleExperimentsVariationWatchAction(value) {
                googleExperiments.getVariation().then(function (variation) {
                    if (variation == value) {
                        element.removeClass('ng-cloak');
                        element.removeClass('ng-hide');
                    } else {
                        element.addClass('ng-hide');
                    }
                });
            });
        };
    }]
);;
angular.module('googleExperiments').provider(
    'googleExperiments', [function googleExperimentsProvider() {
        var variation;
        this.configure = function(conf) {
            this.config = conf;
        };

        this.$get = ['$q', '$timeout', 'angularLoad', function($q, $timeout, angularLoad) {
            var variationDeferred = $q.defer();

            angularLoad.loadScript('//www.google-analytics.com/cx/api.js?experiment=' + this.config.experimentId).then(function() {
                variationDeferred.resolve(cxApi.chooseVariation());
            }).catch(function() {
                //error loading script
            });

            return {
                getVariation: function() {
                    return variationDeferred.promise;
                }
            };
        }];
    }]
);