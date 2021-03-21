"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ImageLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ImageLoader, _React$PureComponent);

  var _super = _createSuper(ImageLoader);

  function ImageLoader(props) {
    var _this;

    _classCallCheck(this, ImageLoader);

    _this = _super.call(this, props);
    _this.state = {
      fileLoaded: false,
      fileLoading: false,
      //selectedManu: null,
      selectedSettings: null //settingsNames: null,

    };
    _this.dropzoneDropAccepted = _this.dropzoneDropAccepted.bind(_assertThisInitialized(_this));
    _this.dropzoneDropRejected = _this.dropzoneDropRejected.bind(_assertThisInitialized(_this));
    _this.dropzoneDrop = _this.dropzoneDrop.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogOpen = _this.dropzoneDialogOpen.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogCancel = _this.dropzoneDialogCancel.bind(_assertThisInitialized(_this));
    _this.onFileReaderAbort = _this.onFileReaderAbort.bind(_assertThisInitialized(_this));
    _this.onFileReaderError = _this.onFileReaderError.bind(_assertThisInitialized(_this));
    _this.onFileReaderLoad = _this.onFileReaderLoad.bind(_assertThisInitialized(_this)); //this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);

    return _this;
  }

  _createClass(ImageLoader, [{
    key: "onFileReaderAbort",
    // onClickSettingsSelection(item) {
    // 	if (item !== null && item !== undefined) {
    // 		this.setState({ selectedSettings: item });
    // 		this.props.onClickSettingsSelection(item);
    // 	}
    // }
    value: function onFileReaderAbort(e) {
      this.setState({
        fileLoaded: false
      });
    }
  }, {
    key: "onFileReaderError",
    value: function onFileReaderError(e) {
      this.setState({
        fileLoaded: false
      });
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
        window.alert("Error " + imageMetadata.Error);
      } else {
        this.setState({
          fileLoaded: true
        });
        this.props.handleLoadMetadataComplete(imageMetadata);
      }
    }
  }, {
    key: "onFileReaderLoad",
    value: function onFileReaderLoad(e) {
      console.log(e.path); //let binaryStr = e.target.result;
      //let microscope = JSON.parse(binaryStr);
      //this.props.onLoadMetadata(imgPath, this.handleLoadMetadataComplete);
    }
  }, {
    key: "dropzoneDrop",
    value: function dropzoneDrop() {
      this.setState({
        fileLoading: true,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropRejected",
    value: function dropzoneDropRejected() {
      this.setState({
        fileLoading: false,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropAccepted",
    value: function dropzoneDropAccepted(acceptedFiles) {
      var reader = new FileReader();
      reader.onabort = this.onFileReaderAbort;
      reader.onerror = this.onFileReaderError;
      reader.onload = this.onFileReaderLoad;
      acceptedFiles.forEach(function (file) {
        return reader.readAsText(file);
      });
      this.setState({
        fileLoading: false
      });
    }
  }, {
    key: "dropzoneDialogOpen",
    value: function dropzoneDialogOpen() {
      this.setState({
        fileLoading: true,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDialogCancel",
    value: function dropzoneDialogCancel() {
      this.setState({
        fileLoading: false,
        fileLoaded: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonStyle = {
        width: "200px",
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowInternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var width = 410;
      var margin = 5; //let inputData = this.props.settings;

      var dropzoneStyle = {
        borderStyle: "dashed",
        borderWidth: "thin",
        width: "".concat(width, "px")
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var loadingMode = this.props.loadingMode;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var isDropzoneActive = false;
      if (loadingMode === 1) isDropzoneActive = true;
      var list = [];
      list.push( /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "dropdown-loadingOption",
        title: "",
        handleMenuItemClick: this.props.onClickLoadingOptionSelection,
        defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
        inputData: this.props.loadingOptions,
        width: width,
        margin: margin,
        tooltip: _constants.loadImage_mode_selector_tooltip
      }));

      if (loadingMode === 1) {
        list.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "dropzone-tooltip",
          position: _constants.loadImage_from_file_tooltip.position,
          title: _constants.loadImage_from_file_tooltip.title,
          content: _constants.loadImage_from_file_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
            key: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected,
            multiple: false
          }, function (_ref) {
            var getRootProps = _ref.getRootProps,
                getInputProps = _ref.getInputProps;
            return /*#__PURE__*/_react.default.createElement("section", {
              style: dropzoneStyle
            }, /*#__PURE__*/_react.default.createElement("div", getRootProps(), /*#__PURE__*/_react.default.createElement("input", getInputProps({
              onClick: _this2.dropzoneDialogOpen
            })), /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Image file you want to work on.")));
          })
        }));
      } // if (loadingMode === 2) {
      // 	let selectedSettings = this.state.selectedSettings;
      // 	let defaultMic =
      // 		selectedSettings !== null && selectedSettings !== undefined
      // 			? inputData.indexOf(selectedSettings)
      // 			: 0;
      // 	//console.log(inputData);
      // 	list.push(
      // 		<DropdownMenu
      // 			key={"dropdown-names"}
      // 			title={""}
      // 			handleMenuItemClick={this.onClickSettingsSelection}
      // 			inputData={inputData}
      // 			defaultValue={defaultMic}
      // 			width={width}
      // 			margin={margin}
      // 			tooltip={createSettings_from_repo_names_tooltip}
      // 		/>
      // 	);
      // }


      list.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "buttons"
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.loadImage_mode_continue_tooltip.position,
        title: _constants.loadImage_mode_continue_tooltip.title,
        content: _constants.loadImage_mode_continue_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: isDropzoneActive && (!fileLoaded || fileLoading)
        }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.back_tooltip.position,
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: this.props.onClickBack,
          style: buttonStyle,
          size: "lg"
        }, "Back")
      })));
      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: windowInternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: this.props.logoImg,
        alt: this.props.logoImg,
        style: styleImage,
        onLoad: this.onImgLoad
      })), list));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {// if (props.loadingMode === 2) {
      // 	if (props.settings !== null && props.settings !== undefined) {
      // 		if (
      // 			state.selectedSettings === null ||
      // 			state.selectedSettings === undefined
      // 		) {
      // 			let selectedSettings = props.settings[0];
      // 			props.onClickSettingsSelection(selectedSettings);
      // 		}
      // 		return null;
      // 	}
      // }
      // return null;
    }
  }]);

  return ImageLoader;
}(_react.default.PureComponent);

exports.default = ImageLoader;