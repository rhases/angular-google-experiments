angular-google-experiments
==========================

Angular module that interfaces with Google Analytics Experiments, change your content dynamically.

## Usage

Install using bower:

    bower install rhases-angularjs-google-experiments

Include the code:

    <script src="/bower_components/angular-google-experiments/googleExperiments.min.js"></script>

Configure the `googleExperimentsProvider` with your Experiment ID:

    angular.module('myApp', ['googleExperiments'])
        .config(function(googleExperimentsProvider) {
            googleExperimentsProvider.configure({
                experimentId: 'your-experiment-id-goes-here'
            });
        })

Place your content in a `variation` directive:

    <div variation="0">Original</div>
    <div variation="1">Variation #1</div>

Load up your page and watch as the chosen variation's content appears.

## Potential Issues

### Experiment data is not being sent

To register the variation that was picked by the user, you have to
ensure that at least one hit is sent to Google Analytics.

I would recommend using the
[angulartics](http://luisfarzati.github.io/angulartics/) library for
Google Analytics.

### Variation is not being picked/chosen

The Google Analytics Experiments javascript has to load before the
variation can be chosen. Currently I'm using a timeout that assumes
the javascript instantly loads (Google's servers are pretty quick) to
set the variation.

If the variation is null, either your experiment ID is incorrect, or
you have to increase the timeout because the script is taking longer
to load.

I tried to fix this by using onload and onreadystate, but the only
consistent thing I found that worked was using the timeout.
