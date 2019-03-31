
mini.TextBox = function () {
  mini.TextBox.superclass.constructor.call(this);


}
mini.extend(mini.TextBox, mini.ValidatorBase, {
  name: "",
  formField: true,

  selectOnFocus: false,

  minWidth: 10,
  minHeight: 15,

  maxLength: 5000,

  emptyText: "",

  text: "",
  value: "",
  defaultValue: "",


  height: 21,

  _emptyCls: "mini-textbox-empty",
  _focusCls: "mini-textbox-focus",
  _disabledCls: "mini-textbox-disabled",

  uiCls: "mini-textbox",
  _InputType: "text",
  _create: function () {
    var html = '<input  type="' + this._InputType + '" class="mini-textbox-input" autocomplete="off"/>';
    if (this._InputType == "textarea") {
      html = '<textarea  class="mini-textbox-input" autocomplete="off"/></textarea>';
    }
    html = '<span class="mini-textbox-border">' + html + '</span>';
    html += '<input type="hidden"/>';

    this.el = document.createElement("span");
    this.el.className = "mini-textbox";
    this.el.innerHTML = html;


    this._borderEl = this.el.firstChild;
    this._textEl = this._borderEl.firstChild;
    this._valueEl = this._borderEl.lastChild;


    this._doEmpty();
  },
  _initEvents: function () {
    mini._BindEvents(function () {
      mini_onOne(this._textEl, "drop", this.__OnDropText, this);
      mini_onOne(this._textEl, "change", this.__OnInputTextChanged, this);
      mini_onOne(this._textEl, "focus", this.__OnFocus, this);
      mini_onOne(this.el, "mousedown", this.__OnMouseDown, this);


      var v = this.value;
      this.value = null;
      this.setValue(v);


    }, this);
    this.on("validation", this.__OnValidation, this);
  },
  _inputEventsInited: false,
  _initInputEvents: function () {
    if (this._inputEventsInited) return;
    this._inputEventsInited = true;


    mini.on(this._textEl, "blur", this.__OnBlur, this);
    mini.on(this._textEl, "keydown", this.__OnInputKeyDown, this);
    mini.on(this._textEl, "keyup", this.__OnInputKeyUp, this);
    mini.on(this._textEl, "keypress", this.__OnInputKeyPress, this);
  },
  destroy: function (removeEl) {
    if (this.el) {

      this.el.onmousedown = null;
    }
    if (this._textEl) {
      this._textEl.ondrop = null;
      this._textEl.onchange = null;
      this._textEl.onfocus = null;


      mini.clearEvent(this._textEl);
      this._textEl = null;
    }
    if (this._valueEl) {
      mini.clearEvent(this._valueEl);
      this._valueEl = null;
    }
    mini.TextBox.superclass.destroy.call(this, removeEl);
  },


  doLayout: function () {

  },


  setHeight: function (value) {
    if (parseInt(value) == value) value += "px";
    this.height = value;
    if (this._InputType == "textarea") {
      this.el.style.height = value;
      this.doLayout();
    }
  },
  setName: function (value) {
    if (this.name != value) {
      this.name = value;

      if (this._valueEl) mini.setAttr(this._valueEl, "name", this.name);
    }
  },
  setValue: function (value) {
    if (value === null || value === undefined) value = "";
    value = String(value);
    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }
    if (this.value !== value) {
      this.value = value;
      this._valueEl.value = this._textEl.value = value;
      this._doEmpty();
    }


  },
  getValue: function () {

    return this.value;
  },
  getFormValue: function () {
    value = this.value;
    if (value === null || value === undefined) value = "";
    return String(value);
  },
  setAllowInput: function (value) {
    if (this.allowInput != value) {
      this.allowInput = value;
      this.doUpdate();
    }
  },
  getAllowInput: function () {
    return this.allowInput;
  },
  _placeholdered: false,
  _doEmpty: function () {
    this._textEl.placeholder = this.emptyText;
    if (this.emptyText) {
      mini._placeholder(this._textEl);
    }


  },
  setEmptyText: function (value) {
    if (this.emptyText != value) {
      this.emptyText = value;
      this._doEmpty();
    }
  },
  getEmptyText: function () {
    return this.emptyText;
  },
  setMaxLength: function (value) {
    this.maxLength = value;

    mini.setAttr(this._textEl, "maxLength", value);

    if (this._InputType == "textarea" && mini.isIE) {
      mini.on(this._textEl, "keypress", this.__OnMaxLengthKeyUp, this);
    }
  },
  __OnMaxLengthKeyUp: function (e) {

    if (this._textEl.value.length >= this.maxLength) {

      e.preventDefault();

    }
  },
  getMaxLength: function () {
    return this.maxLength;
  },
  setReadOnly: function (value) {
    if (this.readOnly != value) {
      this.readOnly = value;
      this.doUpdate();
    }
  },
  setEnabled: function (value) {
    if (this.enabled != value) {
      this.enabled = value;
      this.doUpdate();
      this._tryValidate();
    }
  },
  doUpdate: function () {
    if (this.enabled) {
      this.removeCls(this._disabledCls);
    } else {
      this.addCls(this._disabledCls);
    }
    if (this.isReadOnly() || this.allowInput == false) {
      this._textEl.readOnly = true;
      mini.addClass(this.el, "mini-textbox-readOnly");
    } else {

      this._textEl.readOnly = false;
      mini.removeClass(this.el, "mini-textbox-readOnly");
    }
    if (this.required) {
      this.addCls(this._requiredCls);
    } else {
      this.removeCls(this._requiredCls);
    }

    if (this.enabled) {
      this._textEl.disabled = false;
    } else {
      this._textEl.disabled = true;
    }
  },
  focus: function () {
    try {
      this._textEl.focus();
    } catch (e) {
    }
  },
  blur: function () {
    try {
      this._textEl.blur();
    } catch (e) {
    }
  },
  selectText: function () {
    var me = this;

    function doSelect() {
      try {
        me._textEl.select();
      } catch (ex) {
      }
    }

    doSelect();
    setTimeout(function () {
      doSelect();
    }, 30);
  },
  getTextEl: function () {
    return this._textEl;
  },
  getInputText: function () {
    return this._textEl.value;
  },
  setSelectOnFocus: function (value) {
    this.selectOnFocus = value;
  },
  getSelectOnFocus: function (value) {
    return this.selectOnFocus;
  },

  _errorIconEl: null,
  getErrorIconEl: function () {
    if (!this._errorIconEl) {
      this._errorIconEl = mini.append(this.el, '<span class="mini-errorIcon"></span>');
    }
    return this._errorIconEl;
  },
  _RemoveErrorIcon: function () {
    if (this._errorIconEl) {
      var el = this._errorIconEl;
      jQuery(el).remove();
    }
    this._errorIconEl = null;
  },

  __OnMouseDown: function (e) {

    var sf = this;
    if (!mini.isAncestor(this._textEl, e.target)) {
      setTimeout(function () {
        sf.focus();
        mini.selectRange(sf._textEl, 1000, 1000);
      }, 1);
    } else {
      setTimeout(function () {
        try {
          sf._textEl.focus();
        } catch (ex) {
        }
      }, 1);
    }
  },
  __OnInputTextChanged: function (e, valid) {


    var value = this.value;
    this.setValue(this._textEl.value);

    if (value !== this.getValue() || valid === true) {
      this._OnValueChanged();
    }
  },
  __OnDropText: function (e) {
    var me = this;
    setTimeout(function () {
      me.__OnInputTextChanged(e);
    }, 0);
  },
  __OnInputKeyDown: function (e) {
    var ex = {htmlEvent: e};
    this.fire("keydown", ex);

    if (e.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
      return false;
    }
    if (e.keyCode == 13 || e.keyCode == 9) {

      if (this._InputType == "textarea" && e.keyCode == 13) {
      }
      else {
        this.__OnInputTextChanged(null, true);
        if (e.keyCode == 13) {
          var me = this;

          me.fire("enter", ex);

        }
      }

    }
    if (e.keyCode == 27) {
      e.preventDefault();
    }


  },
  __OnInputKeyUp: function (e) {
    this.fire("keyup", {htmlEvent: e});
  },
  __OnInputKeyPress: function (e) {
    this.fire("keypress", {htmlEvent: e});
  },
  __OnFocus: function (e) {

    this.doUpdate();

    if (this.isReadOnly()) {
      return;
    }
    this._focused = true;
    this.addCls(this._focusCls);
    this._initInputEvents();


    if (this.selectOnFocus) {
      this.selectText();
    }

    this.fire("focus", {htmlEvent: e});
  },
  __OnBlur: function (e) {
    this._focused = false;
    var sf = this;
    setTimeout(function () {
      if (sf._focused == false) {
        sf.removeCls(sf._focusCls);
      }
    }, 2);


    this.fire("blur", {htmlEvent: e});

    if (this.validateOnLeave) {
      this._tryValidate();
    }
  },
  inputStyle: "",
  setInputStyle: function (value) {
    this.inputStyle = value;
    mini.setStyle(this._textEl, value);
  },

  getAttrs: function (el) {
    var attrs = mini.TextBox.superclass.getAttrs.call(this, el);
    var jq = jQuery(el);

    mini._ParseString(el, attrs,
      ["value", "text", "emptyText", "inputStyle",
        "onenter", "onkeydown", "onkeyup", "onkeypress",
        "maxLengthErrorText", "minLengthErrorText", "onfocus", "onblur",

        "vtype",
        "emailErrorText", "urlErrorText", "floatErrorText", "intErrorText", "dateErrorText",
        "minErrorText", "maxErrorText", "rangeLengthErrorText", "rangeErrorText", "rangeCharErrorText"
      ]
    );
    mini._ParseBool(el, attrs,
      ["allowInput", "selectOnFocus"
      ]
    );
    mini._ParseInt(el, attrs,
      ["maxLength", "minLength", "minHeight", "minWidth"
      ]
    );

    return attrs;
  },

  vtype: "",
  setVtype: function (value) {
    this.vtype = value;
  },
  getVtype: function () {
    return this.vtype;
  },
  __OnValidation: function (e) {

    if (e.isValid == false) return;
    mini._ValidateVType(this.vtype, e.value, e, this);


  },
  setEmailErrorText: function (value) {
    this.emailErrorText = value;
  },
  getEmailErrorText: function () {
    return this.emailErrorText;
  },
  setUrlErrorText: function (value) {
    this.urlErrorText = value;
  },
  getUrlErrorText: function () {
    return this.urlErrorText;
  },
  setFloatErrorText: function (value) {
    this.floatErrorText = value;
  },
  getFloatErrorText: function () {
    return this.floatErrorText;
  },
  setIntErrorText: function (value) {
    this.intErrorText = value;
  },
  getIntErrorText: function () {
    return this.intErrorText;
  },
  setDateErrorText: function (value) {
    this.dateErrorText = value;
  },
  getDateErrorText: function () {
    return this.dateErrorText;
  },
  setMaxLengthErrorText: function (value) {
    this.maxLengthErrorText = value;
  },
  getMaxLengthErrorText: function () {
    return this.maxLengthErrorText;
  },
  setMinLengthErrorText: function (value) {
    this.minLengthErrorText = value;
  },
  getMinLengthErrorText: function () {
    return this.minLengthErrorText;
  },
  setMaxErrorText: function (value) {
    this.maxErrorText = value;
  },
  getMaxErrorText: function () {
    return this.maxErrorText;
  },
  setMinErrorText: function (value) {
    this.minErrorText = value;
  },
  getMinErrorText: function () {
    return this.minErrorText;
  },
  setRangeLengthErrorText: function (value) {
    this.rangeLengthErrorText = value;
  },
  getRangeLengthErrorText: function () {
    return this.rangeLengthErrorText;
  },
  setRangeCharErrorText: function (value) {
    this.rangeCharErrorText = value;
  },
  getRangeCharErrorText: function () {
    return this.rangeCharErrorText;
  },
  setRangeErrorText: function (value) {
    this.rangeErrorText = value;
  },
  getRangeErrorText: function () {
    return this.rangeErrorText;
  }

});

mini.regClass(mini.TextBox, 'textbox');
