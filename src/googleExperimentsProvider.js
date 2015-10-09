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