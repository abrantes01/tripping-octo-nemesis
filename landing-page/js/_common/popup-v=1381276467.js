var Popup = function(options) {

    options = options || {};
    if (!options.node.length || !options.overlay.length) {
        return;
    }

    this.shown = false;
    // both assumed to be jquery objects
    this.node = options.node;
    this.overlay = options.overlay;

    var center = function() {
        var viewport = {
            w : document.documentElement.clientWidth,
            h : document.documentElement.clientHeight
        };
        var popup = {
            w : this.node.width(),
            h : this.node.height()
        }
        var $w = $(window);
        var scroll = {
            x : $w.scrollLeft(),
            y : $w.scrollTop()
        }

        this.node.css({
            'position' : 'absolute',
            'top' : (viewport.h - popup.h)/2 + scroll.y,
            'left': (viewport.w - popup.w)/2 + scroll.x
        });
    }

    this.show = function(callback, speed) {
        if (!this.shown) {

            if (!speed) speed = 'slow';

            // move popup node and overlay to body to avoid styles collisions
            if (this.node.parentNode != document.body) {
                $(document.body).append(this.node.add(this.overlay));
            }
            center.apply(this);
            var browserInfos = detect_browser(Array('browserName','majorVersion'));
            if (browserInfos['browserName'] == 'Microsoft Internet Explorer' && browserInfos['majorVersion'] == '6.0') {
                // stretch background to fit the all the page
                var $body = $(document.body);
                this.overlay.css({
                    'width'  : $body.width() - 2,
                    'height' : $body.height()
                });
            }
            this.overlay
                .css({
                    'opacity' : 0.7
                })
                .fadeIn(speed);
            this.node.fadeIn(speed, callback);

            this.shown = true;
        }

    }

    this.hide = function(noAnimation, callback, speed) {
        if (noAnimation) {
            this.node.hide();
            this.overlay.hide();
            (typeof callback == 'function') && callback();
        } else {
            if (!speed) speed = 'slow';
            this.node.fadeOut(speed);
            this.overlay.fadeOut(speed);
        }
        this.shown = false;
    }

    return this;
}