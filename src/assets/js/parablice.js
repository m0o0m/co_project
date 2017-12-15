var parabliceFun = (function () {

    var _$ = function (_this) {
        return _this.constructor == jQuery ? _this : $(_this);
    };
    function now() {
        return +new Date();
    }

    function toInteger(text) {
        text = parseInt(text);
        return isFinite(text) ? text : 0;
    }

    var Parabola = function (options) {
        this.initialize(options);
    };
    Parabola.prototype = {
        constructor: Parabola,
        initialize: function (options) {
            this.options = this.options || this.getOptions(options);
            console.log(this.options)
            var ops = this.options;
            if (!this.options.el) {
                return;
            }
            this.$el = _$(ops.el);
            this.timerId = null;
            this.elOriginalLeft = toInteger(this.$el.css("left"));
            this.elOriginalTop = toInteger(this.$el.css("top"));
            if (ops.targetEl) {
                this.driftX = toInteger(_$(ops.targetEl).css("left")) - this.elOriginalLeft;
                this.driftY = toInteger(_$(ops.targetEl).css("top")) - this.elOriginalTop;
            } else {
                this.driftX = ops.offset[0];
                this.driftY = ops.offset[1];
            }
            this.duration = ops.duration;
            this.curvature = ops.curvature;

            this.b = ( this.driftY - this.curvature * this.driftX * this.driftX ) / this.driftX;
            if (ops.autostart) {
                this.start();
            }
        },
        getOptions: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options = $.extend({}, defaultSetting, _$(options.el).data(), (this.options || {}), options);

            return options;
        },
        domove: function (x, y) {

            this.$el.css({
                position: "absolute",
                left: this.elOriginalLeft + x,
                top: this.elOriginalTop + y
            });

            return this;
        },
        step: function (now) {
            var ops = this.options;
            var x, y;
            if (now > this.end) {
                x = this.driftX;
                y = this.driftY;
                this.domove(x, y);
                this.stop();
                if (typeof ops.callback === 'function') {
                    ops.callback.call(this);
                }
            } else {
                x = this.driftX * ((now - this.begin) / this.duration);
                y = this.curvature * x * x + this.b * x;

                this.domove(x, y);
                if (typeof ops.stepCallback === 'function') {
                    ops.stepCallback.call(this,x,y);
                }
            }
            return this;
        },

        setOptions: function (options) {
            this.reset();
            if (typeof options !== "object") {
                options = {};
            }
            this.options = $.extend(this.options,options);
            this.initialize(this.options);
            return this;
        },

        start: function () {
            var self = this;
            this.begin = now();
            this.end = this.begin + this.duration;
            if (this.driftX === 0 && this.driftY === 0) {
                return;
            }
            /*timers.push(this);
             Timer.start();*/
            if (!!this.timerId) {
                clearInterval(this.timerId);
                this.stop();
            }
            this.timerId = setInterval(function () {
                var t = now();
                self.step(t);

            }, 13);
            return this;
        },

        reset: function (x, y) {
            this.stop();
            x = x ? x : 0;
            y = y ? y : 0;
            this.domove(x, y);
            return this;
        },

        stop: function () {
            if (!!this.timerId) {
                clearInterval(this.timerId);

            }
            return this;
        },

        test: function () {
            console.log('testset')
        }
    };
    var defaultSetting = {
        el: null,
        offset: [0, 0],
        targetEl: null,
        duration: 500,
        curvature: 0.001,
        callback: null,
        autostart: false,
        stepCallback: null
    };
    // window.Parabola = Parabola;
    return Parabola ;
})();

var fallMan = function (argv) {
    return new parabliceFun(argv);
}

export default {
    fallMan
}