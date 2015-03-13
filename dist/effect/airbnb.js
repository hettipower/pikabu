(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '$',
            'velocity'
        ], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework, framework.Velocity);
    }
}(function($, Velocity) {
    return function() {
        var plugin = this;
        var coverage = this._coverage();

        var $animators = $('.pikabu__container, .pikabu__fixed, .shade');

        this.$pikabu
            .css({
                top: 0,
                bottom: 0,
                left: 0,
                right: coverage ? coverage : 'auto',
                width: coverage ? 'auto' : plugin.options.coverage,
                height: 'auto'
            });

        return {
            open: function() {
                // Force feed the initial value
                Velocity.animate(
                    $animators,
                    {
                        translateZ: ['-750px', '0'],
                        translateX: [plugin.options.coverage, '0'],
                        rotateY: ['-45deg', '0']
                    },
                    {
                        begin: function() {
                            plugin.$viewport.css({
                                '-webkit-perspective': '1500px',
                                'overflow': 'hidden'
                            });
                        },
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        complete: function() {
                            plugin.animation.openComplete.call(plugin);
                        }
                    }
                );

                Velocity.animate(
                    plugin.$pikabu,
                    {
                        translateX: [0, '-100%'],
                        translateZ: [0, 0]
                    },
                    {
                        begin: function() {
                            plugin.$pikabu.css('zIndex', '10');
                        },
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        display: 'block',
                    }
                );
            },
            close: function() {

                Velocity.animate(
                    $animators,
                    {
                        translateZ: 0,
                        translateX: 0,
                        rotateY: 0
                    },
                    {
                        begin: function() {
                            plugin.animation.beginClose.call(plugin);
                        },
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        complete: function() {
                            plugin.$viewport.css({
                                '-webkit-perspective': '',
                                'overflow': ''
                            });

                            plugin.animation.closeComplete.call(plugin);
                        }
                    }
                );

                Velocity.animate(
                    plugin.$pikabu,
                    {
                        translateX: ['-100%']
                    },
                    {
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        display: 'none'
                    }
                );
            }
        };
    };
}));
