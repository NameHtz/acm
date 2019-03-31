mini.ValidatorBase = function () {
  mini.ValidatorBase.superclass.constructor.call(this);
}
mini.extend(mini.ValidatorBase, mini.Control, {
  required: false,
  requiredErrorText: "This field is required.",
  _requiredCls: "mini-required",

  errorText: "",
  _errorCls: "mini-error",
  _invalidCls: "mini-invalid",

  errorMode: "icon",
  validateOnChanged: true,
  validateOnLeave: true,
  _IsValid: true,

  _tryValidate: function () {
    if (this._tryValidateTimer) clearTimeout(this._tryValidateTimer);
    var me = this;
    this._tryValidateTimer = setTimeout(function () {
      me.validate();
    }, 30);
  },
  validate: function () {

    if (this.enabled == false) {
      this.setIsValid(true);
      return true;
    }
    var e = {
      value: this.getValue(),
      errorText: "",
      isValid: true
    };

    if (this.required) {
      if (mini.isNull(e.value) || String(e.value).trim() === "") {
        e.isValid = false;
        e.errorText = this.requiredErrorText;
      }
    }

    this.fire("validation", e);

    this.errorText = e.errorText;
    this.setIsValid(e.isValid);
    return this.isValid();
  },
  isValid: function () {
    return this._IsValid;
  },
  setIsValid: function (value) {

    this._IsValid = value;
    this.doUpdateValid();

  },
  getIsValid: function () {
    return this._IsValid;
  },
  setValidateOnChanged: function (value) {
    this.validateOnChanged = value;
  },
  getValidateOnChanged: function (value) {
    return this.validateOnChanged;
  },
  setValidateOnLeave: function (value) {
    this.validateOnLeave = value;
  },
  getValidateOnLeave: function (value) {
    return this.validateOnLeave;
  },

  setErrorMode: function (value) {
    if (!value) value = "none";
    this.errorMode = value.toLowerCase();
    if (this._IsValid == false) this.doUpdateValid();
  },
  getErrorMode: function () {
    return this.errorMode;
  },
  setErrorText: function (value) {
    this.errorText = value;
    if (this._IsValid == false) this.doUpdateValid();
  },
  getErrorText: function () {
    return this.errorText;
  },
  setRequired: function (value) {
    this.required = value;
    if (this.required) {
      this.addCls(this._requiredCls);
    } else {
      this.removeCls(this._requiredCls);
    }
  },
  getRequired: function () {
    return this.required;
  },
  setRequiredErrorText: function (value) {
    this.requiredErrorText = value;
  },
  getRequiredErrorText: function () {
    return this.requiredErrorText;
  },
  errorIconEl: null,
  getErrorIconEl: function () {
    return this._errorIconEl;
  },
  _RemoveErrorIcon: function () {

  },
  doUpdateValid: function () {
    var me = this;
    this._doUpdateValidTimer = setTimeout(function () {
      me.__doUpdateValid();
    }, 1);
  },
  __doUpdateValid: function () {
    if (!this.el) return;
    this.removeCls(this._errorCls);
    this.removeCls(this._invalidCls);
    this.el.title = "";
    if (this._IsValid == false) {
      switch (this.errorMode) {
        case "icon":
          this.addCls(this._errorCls);
          var icon = this.getErrorIconEl();
          if (icon) icon.title = this.errorText;
          break;
        case "border":
          this.addCls(this._invalidCls);
          this.el.title = this.errorText;
        default:
          this._RemoveErrorIcon();
          break;
      }
    } else {
      this._RemoveErrorIcon();
    }
    this.doLayout();
  },
  _OnValueChanged: function () {
    if (this.validateOnChanged) {
      this._tryValidate();
    }
    this.fire("valuechanged", {value: this.getValue()});
  },
  onValueChanged: function (fn, scope) {
    this.on("valuechanged", fn, scope);
  },
  onValidation: function (fn, scope) {
    this.on("validation", fn, scope);
  },
  getAttrs: function (el) {
    var attrs = mini.ValidatorBase.superclass.getAttrs.call(this, el);

    mini._ParseString(el, attrs,
      ["onvaluechanged", "onvalidation",
        "requiredErrorText", "errorMode"
      ]
    );

    mini._ParseBool(el, attrs,
      ["validateOnChanged", "validateOnLeave"
      ]
    );

    var required = el.getAttribute("required");
    if (!required) required = el.required;
    if (!required) {
      var o = el.attributes["required"];
      if (o) {
        required = o.value == 'null' ? null : 'true';
      }
    }
    if (required) {
      attrs.required = required != "false" ? true : false;
    }

    return attrs;
  }
});
