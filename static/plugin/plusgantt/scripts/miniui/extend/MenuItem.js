mini.MenuItem = function () {
  mini.MenuItem.superclass.constructor.call(this);
}
mini.extend(mini.MenuItem, mini.Control, {
  text: "",
  iconCls: "",
  iconStyle: "",
  iconPosition: "left",

  showIcon: true,
  showAllow: true,

  checked: false,
  checkOnClick: false,
  groupName: "",

  _hoverCls: "mini-menuitem-hover",
  _pressedCls: "mini-menuitem-pressed",
  _checkedCls: "mini-menuitem-checked",

  _clearBorder: false,

  menu: null,

  set: function (kv) {
    if (typeof kv == 'string') {
      return this;
    }

    this.ownerMenu = kv.ownerMenu;
    delete kv.ownerMenu;


    mini.MenuItem.superclass.set.call(this, kv);


    return this;
  },

  uiCls: "mini-menuitem",
  _create: function () {
    var el = this.el = document.createElement("div");
    this.el.className = "mini-menuitem";

    this.el.innerHTML = '<div class="mini-menuitem-inner"><div class="mini-menuitem-icon"></div><div class="mini-menuitem-text"></div><div class="mini-menuitem-allow"></div></div>';
    this._innerEl = this.el.firstChild;
    this._iconEl = this._innerEl.firstChild;
    this._textEl = this._innerEl.childNodes[1];
    this.allowEl = this._innerEl.lastChild;
  },
  _initEvents: function () {
    mini._BindEvents(function () {
      mini_onOne(this.el, "mouseover", this.__OnMouseOver, this);
    }, this);

  },
  _inputEventsInited: false,
  _initInputEvents: function () {
    if (this._inputEventsInited) return;
    this._inputEventsInited = true;

    mini_onOne(this.el, "click", this.__OnClick, this);
    mini_onOne(this.el, "mouseup", this.__OnMouseUp, this);

    mini_onOne(this.el, "mouseout", this.__OnMouseOut, this);


  },
  destroy: function (removeEl) {
    if (this.el) {
      this.el.onmouseover = null
    }
    this.menu = this._innerEl = this._iconEl = this._textEl = this.allowEl = null;
    mini.MenuItem.superclass.destroy.call(this, removeEl);
  },
  within: function (e) {
    if (mini.isAncestor(this.el, e.target)) return true;
    if (this.menu && this.menu.within(e)) return true;
    return false;
  },
  _getIconImg: function () {


    return this.img && this.getTopMenu() ? this.getTopMenu().imgPath + this.img : this.img;
  },
  _doUpdateIcon: function () {


    var img = this._getIconImg();
    var hasIcon = !!(this.iconStyle || this.iconCls || this.checkOnClick || img);
    if (this._iconEl) {
      mini.setStyle(this._iconEl, this.iconStyle);
      mini.addClass(this._iconEl, this.iconCls);


      if (img) {
        var style = 'background-image:url(' + img + ')';
        mini.setStyle(this._iconEl, style);
      }

      if (this.checked) jQuery(this._iconEl).css({"background-image": ""});

      this._iconEl.style.display = hasIcon ? "block" : "none";
    }
    if (this.iconPosition == "top") {
      mini.addClass(this.el, "mini-menuitem-icontop");
    } else {
      mini.removeClass(this.el, "mini-menuitem-icontop");
    }
  },


  doUpdate: function () {
    if (this._textEl) this._textEl.innerHTML = this.text;
    this._doUpdateIcon();


    if (this.checked) {
      mini.addClass(this.el, this._checkedCls);
      jQuery(this._iconEl).css({"background-image": ""});
    } else {
      mini.removeClass(this.el, this._checkedCls);
    }
    if (this.allowEl) {
      if (this.menu && this.menu.items.length > 0) {
        this.allowEl.style.display = "block";
      } else {
        this.allowEl.style.display = "none";
      }
    }
  },
  setText: function (value) {
    this.text = value;

    if (this._textEl) this._textEl.innerHTML = this.text;
  },
  getText: function () {
    return this.text;
  },
  setIconCls: function (value) {
    mini.removeClass(this._iconEl, this.iconCls);
    this.iconCls = value;

    this._doUpdateIcon();
  },
  getIconCls: function () {
    return this.iconCls;
  },
  setImg: function (value) {
    this.img = value;

    this._doUpdateIcon();
  },
  getImg: function () {
    return this.img;
  },
  setIconStyle: function (value) {
    this.iconStyle = value;

    this._doUpdateIcon();
  },
  getIconStyle: function () {
    return this.iconStyle;
  },
  setIconPosition: function (value) {
    this.iconPosition = value;

    this._doUpdateIcon();
  },
  getIconPosition: function () {
    return this.iconPosition;
  },
  setCheckOnClick: function (value) {
    this.checkOnClick = value;
    if (value) {
      mini.addClass(this.el, "mini-menuitem-showcheck");
    } else {
      mini.removeClass(this.el, "mini-menuitem-showcheck");
    }
    this.doUpdate();
  },
  getCheckOnClick: function () {
    return this.checkOnClick;
  },
  setChecked: function (value) {
    if (this.checked != value) {
      this.checked = value;
      this.doUpdate();
      this.fire("checkedchanged");
    }
  },
  getChecked: function () {
    return this.checked;
  },
  setGroupName: function (value) {
    if (this.groupName != value) {
      this.groupName = value;
    }
  },
  getGroupName: function () {
    return this.groupName;
  },
  setChildren: function (value) {
    this.setMenu(value);
  },
  setMenu: function (value) {
    if (mini.isArray(value)) {
      value = {
        type: "menu",
        items: value
      };
    }
    if (this.menu !== value) {
      value.ownerItem = this;
      this.menu = mini.getAndCreate(value);
      this.menu.hide();
      this.menu.ownerItem = this;
      this.doUpdate();
      this.menu.on("itemschanged", this.__OnItemsChanged, this);

    }
  },
  getMenu: function () {
    return this.menu;
  },
  showMenu: function () {
    if (this.menu && this.menu.isDisplay() == false) {
      this.menu.setHideAction("outerclick");

      var options = {
        xAlign: "outright",
        yAlign: "top",
        outXAlign: "outleft",

        popupCls: "mini-menu-popup"
      };

      if (this.ownerMenu && this.ownerMenu.vertical == false) {

        options.xAlign = "left";
        options.yAlign = "below";
        options.outXAlign = null;
      }


      this.menu.showAtEl(this.el, options);

    }
  },
  hideMenu: function () {
    if (this.menu) this.menu.hide();
  },
  hide: function () {
    this.hideMenu();
    this.setVisible(false);
  },

  __OnItemsChanged: function (e) {
    this.doUpdate();
  },
  getTopMenu: function () {
    if (this.ownerMenu) {
      if (this.ownerMenu.ownerItem) return this.ownerMenu.ownerItem.getTopMenu();
      else return this.ownerMenu;
    }
    return null;
  },

  __OnClick: function (e) {

    if (this.isReadOnly()) return;

    if (this.checkOnClick) {
      if (this.ownerMenu && this.groupName) {
        var groups = this.ownerMenu.getGroupItems(this.groupName);
        if (groups.length > 0) {
          if (this.checked == false) {
            for (var i = 0, l = groups.length; i < l; i++) {
              var item = groups[i];
              if (item != this) {

                item.setChecked(false);
              }
            }
            this.setChecked(true);
          }
        } else {
          this.setChecked(!this.checked);
        }
      } else {
        this.setChecked(!this.checked);
      }
    }

    this.fire("click");

    var topMenu = this.getTopMenu();
    if (topMenu) {
      topMenu._OnItemClick(this, e);
    }
  },
  __OnMouseUp: function (e) {
    if (this.isReadOnly()) return;

    if (this.ownerMenu) {
      var me = this;
      setTimeout(function () {
        if (me.isDisplay()) {
          me.ownerMenu.showItemMenu(me);

        }
      }, 1);
    }
  },
  __OnMouseOver: function (e) {

    if (this.isReadOnly()) return;
    this._initInputEvents();
    mini.addClass(this.el, this._hoverCls);

    this.el.title = this.text;

    if (this._textEl.scrollWidth > this._textEl.clientWidth) {
      this.el.title = this.text;
    } else {
      this.el.title = "";
    }

    if (this.ownerMenu) {
      if (this.ownerMenu.isVertical() == true) {
        this.ownerMenu.showItemMenu(this);
      } else if (this.ownerMenu.hasShowItemMenu()) {
        this.ownerMenu.showItemMenu(this);
      }
    }
  },

  __OnMouseOut: function (e) {
    mini.removeClass(this.el, this._hoverCls);
  },
  onClick: function (fn, scope) {
    this.on("click", fn, scope);
  },
  onCheckedChanged: function (fn, scope) {
    this.on("checkedchanged", fn, scope);
  },

  getAttrs: function (el) {
    var attrs = mini.MenuItem.superclass.getAttrs.call(this, el);
    var jq = jQuery(el);

    attrs.text = el.innerHTML;
    mini._ParseString(el, attrs,
      ["img", "text", "iconCls", "iconStyle", "iconPosition", "groupName", "onclick", "oncheckedchanged"
      ]
    );
    mini._ParseBool(el, attrs,
      ["checkOnClick", "checked"
      ]
    );

    return attrs;
  }
});
mini.regClass(mini.MenuItem, 'menuitem');