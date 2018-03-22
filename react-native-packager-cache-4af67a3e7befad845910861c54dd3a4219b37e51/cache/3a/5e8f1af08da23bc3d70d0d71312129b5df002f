Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require('react-native');

var AnimatedValueSubscription = function () {
  function AnimatedValueSubscription(value, callback) {
    babelHelpers.classCallCheck(this, AnimatedValueSubscription);

    this._value = value;
    this._token = value.addListener(callback);
  }

  babelHelpers.createClass(AnimatedValueSubscription, [{
    key: 'remove',
    value: function remove() {
      this._value.removeListener(this._token);
    }
  }]);
  return AnimatedValueSubscription;
}();

exports.default = AnimatedValueSubscription;