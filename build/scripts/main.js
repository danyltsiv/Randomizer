(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "animate",
        value: function animate(draw, duration) {
            var start = performance.now();

            requestAnimationFrame(function animate(time) {
                var timePassed = time - start;
                if (timePassed > duration) timePassed = duration;
                draw(timePassed);

                if (timePassed < duration) {
                    requestAnimationFrame(animate);
                }
            });
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}],2:[function(require,module,exports){
'use strict';

var _randomizer = require('./randomizer');

var _randomizer2 = _interopRequireDefault(_randomizer);

var _animator = require('./animator');

var _animator2 = _interopRequireDefault(_animator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var goBtn = document.getElementById('goBtn');
var number = document.getElementById('number');
var clrBtn = document.getElementById('clrBtn');
var unique = document.getElementById('unique');
var from = document.getElementById('from');
var to = document.getElementById('to');
var animator = new _animator2.default();
var randomizer = new _randomizer2.default();

goBtn.onclick = function () {
    var rnd = void 0;
    var numbers = [];
    var i = 0;

    for (var key in localStorage) {
        numbers[i] = parseInt(localStorage[key]);
        i++;
    }

    if (!isNaN(parseInt(from.value)) && !isNaN(parseInt(to.value))) {
        if (!unique.checked || randomizer.randomize(parseInt(from.value), parseInt(to.value), numbers) !== false) {

            animator.animate(function (timePassed) {
                if (!unique.checked) {
                    rnd = randomizer.randomize(parseInt(from.value), parseInt(to.value));
                } else {
                    rnd = randomizer.randomize(parseInt(from.value), parseInt(to.value), numbers);
                }
                number.innerHTML = rnd;
                var fontSizeAnim = timePassed / 100;
                number.style.fontSize = fontSizeAnim + 'vh';
            }, 4000);

            if (unique.checked) {
                setTimeout(function () {
                    localStorage.setItem(localStorage.length, rnd);
                }, 4100);
            }
        } else {
            number.innerHTML = '<p class=\'error\'>No more unique numbers! Reset the local storage please!</p>';
        }
    } else {
        number.innerHTML = '<p class=\'error\'>Invalid characters!</p>';
    }
};

clrBtn.onclick = function () {
    localStorage.clear();
    number.innerHTML = '<p class=\'reseted\'>Local Storage reseted succesfully!</p>';
};

unique.onclick = function () {
    clrBtn.disabled = !unique.checked;
};

},{"./animator":1,"./randomizer":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }
    //Randomizer for integer numbers.


    _createClass(_class, [{
        key: "randomize",
        value: function randomize(from, to, except) {
            if (from > to) {
                var temp = from;
                from = to;
                to = temp;
            }

            var random = this.getRandomInteger(from, to);

            if (except && except.length != 0) {
                if (!this.checkInterval(from, to, except)) {
                    return false;
                } else {
                    while (except.includes(random)) {
                        random = this.getRandomInteger(from, to);
                    }
                }
            }

            return random;
        }
    }, {
        key: "checkInterval",
        value: function checkInterval(from, to, except) {
            var result = false;
            for (var i = from; i <= to; i++) {
                if (!except.includes(i)) result = true;
            }

            return result;
        }
    }, {
        key: "getRandomInteger",
        value: function getRandomInteger(from, to) {
            return Math.floor(Math.random() * (to - from + 1)) + from;
        }
    }]);

    return _class;
}();

exports.default = _class;

},{}]},{},[2]);
