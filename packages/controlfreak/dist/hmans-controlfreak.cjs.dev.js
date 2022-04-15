'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Signal = /*#__PURE__*/function () {
  function Signal() {
    _classCallCheck(this, Signal);

    _defineProperty(this, "subscribers", new Set());
  }

  _createClass(Signal, [{
    key: "on",
    value: function on(subscriber) {
      this.subscribers.add(subscriber);
    }
  }, {
    key: "off",
    value: function off(subscriber) {
      this.subscribers["delete"](subscriber);
    }
  }, {
    key: "emit",
    value: function emit() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.subscribers.forEach(function (l) {
        return l.apply(void 0, args);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.subscribers.clear();
    }
  }]);

  return Signal;
}();

var Device = /*#__PURE__*/_createClass(function Device() {
  _classCallCheck(this, Device);

  _defineProperty(this, "onActivity", new Signal());
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var KeyboardDevice = /*#__PURE__*/function (_Device) {
  _inherits(KeyboardDevice, _Device);

  var _super = _createSuper(KeyboardDevice);

  function KeyboardDevice() {
    var _this;

    _classCallCheck(this, KeyboardDevice);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "keyState", {});

    _defineProperty(_assertThisInitialized(_this), "start", function () {
      window.addEventListener("keydown", _this.handleKeyDown);
      window.addEventListener("keyup", _this.handleKeyUp);
      return _assertThisInitialized(_this);
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      window.removeEventListener("keydown", _this.handleKeyDown);
      window.removeEventListener("keyup", _this.handleKeyUp);
      return _assertThisInitialized(_this);
    });

    _defineProperty(_assertThisInitialized(_this), "isPressed", function (key) {
      return _this.keyState[key] ? 1 : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      _this.keyState[event.key] = true;

      _this.onActivity.emit();
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (event) {
      _this.keyState[event.key] = false;
    });

    return _this;
  }

  _createClass(KeyboardDevice, [{
    key: "update",
    value: function update() {}
  }]);

  return KeyboardDevice;
}(Device);

var GamepadDevice = /*#__PURE__*/function (_Device) {
  _inherits(GamepadDevice, _Device);

  var _super = _createSuper(GamepadDevice);

  function GamepadDevice() {
    var _this;

    _classCallCheck(this, GamepadDevice);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "lastTimestamp", 0);

    _defineProperty(_assertThisInitialized(_this), "handleGamepadConnected", function (e) {
      console.debug("New gamepad connected:", e.gamepad.id);
      _this.deviceIndex = e.gamepad.index;
    });

    _defineProperty(_assertThisInitialized(_this), "handleGamepadDisconnected", function (e) {
      console.debug("Gamepad disconnected:", e.gamepad.id);
      delete _this.deviceIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "start", function () {
      window.addEventListener("gamepadconnected", _this.handleGamepadConnected);
      window.addEventListener("gamepaddisconnected", _this.handleGamepadDisconnected);
      return _assertThisInitialized(_this);
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      window.removeEventListener("gamepadconnected", _this.handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", _this.handleGamepadDisconnected);
      return _assertThisInitialized(_this);
    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      _this.device = _this.deviceIndex !== undefined ? navigator.getGamepads()[_this.deviceIndex] : undefined;

      if (_this.device && _this.device.timestamp > _this.lastTimestamp) {
        _this.lastTimestamp = _this.device.timestamp;

        _this.onActivity.emit();
      }
    });

    return _this;
  }

  return _createClass(GamepadDevice);
}(Device);

var Controller = /*#__PURE__*/function () {
  function Controller() {
    var _this = this;

    _classCallCheck(this, Controller);

    _defineProperty(this, "devices", [new KeyboardDevice().start(), new GamepadDevice().start()]);

    _defineProperty(this, "activeDevice", null);

    _defineProperty(this, "controls", {});

    var _iterator = _createForOfIteratorHelper(this.devices),
        _step;

    try {
      var _loop = function _loop() {
        var device = _step.value;
        device.onActivity.on(function () {
          return _this.activeDevice = device;
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(Controller, [{
    key: "update",
    value: function update() {
      var _iterator2 = _createForOfIteratorHelper(this.devices),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var device = _step2.value;
          device.update();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      for (var _i = 0, _Object$values = Object.values(this.controls); _i < _Object$values.length; _i++) {
        var control = _Object$values[_i];
        control.update();
      }
    }
  }, {
    key: "addControl",
    value: function addControl(name, klass) {
      var instance = new klass(this);
      this.controls[name] = instance;
      return instance;
    }
  }, {
    key: "removeControl",
    value: function removeControl(name) {
      delete this.controls[name];
    }
  }]);

  return Controller;
}();

var Control = /*#__PURE__*/function () {
  function Control(controller) {
    _classCallCheck(this, Control);

    _defineProperty(this, "steps", new Array());

    this.controller = controller;
  }

  _createClass(Control, [{
    key: "addStep",
    value: function addStep(step) {
      this.steps.push(step);
      return this;
    }
  }, {
    key: "removeStep",
    value: function removeStep(step) {
      var pos = this.steps.indexOf(step, 0);
      if (pos >= 0) this.steps.splice(pos, 1);
    }
  }, {
    key: "update",
    value: function update() {
      this.reset();

      var _iterator = _createForOfIteratorHelper(this.steps),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var step = _step.value;
          step(this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Control;
}();
var VectorControl = /*#__PURE__*/function (_Control) {
  _inherits(VectorControl, _Control);

  var _super = _createSuper(VectorControl);

  function VectorControl() {
    var _this;

    _classCallCheck(this, VectorControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "value", {
      x: 0,
      y: 0
    });

    return _this;
  }

  _createClass(VectorControl, [{
    key: "reset",
    value: function reset() {
      this.value.x = 0;
      this.value.y = 0;
    }
  }]);

  return VectorControl;
}(Control);
var BooleanControl = /*#__PURE__*/function (_Control2) {
  _inherits(BooleanControl, _Control2);

  var _super2 = _createSuper(BooleanControl);

  function BooleanControl() {
    var _this2;

    _classCallCheck(this, BooleanControl);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "value", false);

    return _this2;
  }

  _createClass(BooleanControl, [{
    key: "reset",
    value: function reset() {
      this.value = false;
    }
  }]);

  return BooleanControl;
}(Control);

var normalizeVector = function normalizeVector(_ref) {
  var value = _ref.value;
  var length = Math.sqrt(Math.pow(value.x, 2) + Math.pow(value.y, 2)) || 1;
  value.x /= length;
  value.y /= length;
};
var clampVector = function clampVector() {
  var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function (_ref2) {
    var value = _ref2.value;
    var length = Math.sqrt(Math.pow(value.x, 2) + Math.pow(value.y, 2)) || 1;

    if (length > maxLength) {
      var factor = maxLength / length;
      value.x *= factor;
      value.y *= factor;
    }
  };
};
var compositeKeyboardVector = function compositeKeyboardVector(up, down, left, right) {
  return function (_ref3) {
    var value = _ref3.value,
        controller = _ref3.controller;

    if (controller.activeDevice instanceof KeyboardDevice) {
      var isPressed = controller.activeDevice.isPressed;
      value.x = isPressed(right) - isPressed(left);
      value.y = isPressed(up) - isPressed(down);
    }
  };
};
var gamepadAxisVector = function gamepadAxisVector() {
  var horizontalAxis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var verticalAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return function (_ref4) {
    var value = _ref4.value,
        controller = _ref4.controller;

    if (controller.activeDevice instanceof GamepadDevice) {
      var device = controller.activeDevice.device;

      if (device) {
        value.x = device.axes[horizontalAxis];
        value.y = -device.axes[verticalAxis];
      }
    }
  };
};
var whenKeyPressed = function whenKeyPressed(key) {
  return function (control) {
    if (control.controller.activeDevice instanceof KeyboardDevice) {
      control.value = !!control.controller.activeDevice.isPressed(key);
    }
  };
};
var whenButtonPressed = function whenButtonPressed(button) {
  return function (control) {
    if (control.controller.activeDevice instanceof GamepadDevice) {
      control.value = control.controller.activeDevice.device.buttons[button].pressed;
    }
  };
};

exports.BooleanControl = BooleanControl;
exports.Control = Control;
exports.Controller = Controller;
exports.Device = Device;
exports.GamepadDevice = GamepadDevice;
exports.KeyboardDevice = KeyboardDevice;
exports.VectorControl = VectorControl;
exports.clampVector = clampVector;
exports.compositeKeyboardVector = compositeKeyboardVector;
exports.gamepadAxisVector = gamepadAxisVector;
exports.normalizeVector = normalizeVector;
exports.whenButtonPressed = whenButtonPressed;
exports.whenKeyPressed = whenKeyPressed;
