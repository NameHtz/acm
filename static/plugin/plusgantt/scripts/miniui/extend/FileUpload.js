mini.FileUpload = function (config) {
  this.postParam = {};
  mini.FileUpload.superclass.constructor.call(this, config);
  this.on("validation", this.__OnValidation, this);
}

mini.extend(mini.FileUpload, mini.ButtonEdit, {
  width: 180,
  buttonText: "浏览...",
  _buttonWidth: 56,

  limitTypeErrorText: "上传文件格式为：",
  readOnly: true,
  _cellSpacing: 0,

  limitSize: '',
  limitType: '',
  typesDescription: '上传文件格式',
  uploadLimit: 0,
  queueLimit: '',
  flashUrl: '',
  uploadUrl: '',

  postParam: null,

  uploadOnSelect: false,

  uiCls: "mini-fileupload",
  _create: function () {
    mini.FileUpload.superclass._create.call(this);

    mini.addClass(this.el, "mini-htmlfile");

    this._uploadId = this.uid + "$button_placeholder";
    this._fileEl = mini.append(this.el, '<span id="' + this._uploadId + '"></span>');
    this.uploadEl = this._fileEl;

    mini.on(this._borderEl, "mousemove", this.__OnMouseMove, this);
  },
  _getButtonHtml: function () {
    var hover = 'onmouseover="mini.addClass(this, \'' + this._buttonHoverCls + '\');" '
      + 'onmouseout="mini.removeClass(this, \'' + this._buttonHoverCls + '\');"';
    return '<span class="mini-buttonedit-button" ' + hover + '>' + this.buttonText + '</span>';
  },
  destroy: function (removeEl) {
    if (this._innerEl) {
      mini.clearEvent(this._innerEl);

      this._innerEl = null;
    }
    mini.FileUpload.superclass.destroy.call(this, removeEl);
  },
  __OnMouseMove: function (evt) {

    if (this.enabled == false) return;
    var sf = this;
    if (!this.swfUpload) {

      var upload = new SWFUpload({
        file_post_name: this.name,
        upload_url: sf.uploadUrl,
        flash_url: sf.flashUrl,


        file_size_limit: sf.limitSize,
        file_types: sf.limitType,
        file_types_description: sf.typesDescription,
        file_upload_limit: parseInt(sf.uploadLimit),
        file_queue_limit: sf.queueLimit,


        file_queued_handler: mini.createDelegate(this.__on_file_queued, this),

        upload_error_handler: mini.createDelegate(this.__on_upload_error, this),
        upload_success_handler: mini.createDelegate(this.__on_upload_success, this),
        upload_complete_handler: mini.createDelegate(this.__on_upload_complete, this),


        button_placeholder_id: this._uploadId,
        button_width: 1000,
        button_height: 50,
        button_window_mode: "transparent",


        debug: false

      });
      upload.flashReady();
      this.swfUpload = upload;

      var el = this.swfUpload.movieElement;
      el.style.zIndex = 1000;
      el.style.position = "absolute";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.width = "100%";
      el.style.height = "50px";


    } else {


    }
  },
  addPostParam: function (value) {
    mini.copyTo(this.postParam, value);
  },
  setPostParam: function (value) {
    this.addPostParam(value);
  },
  getPostParam: function () {
    return this.postParam;
  },
  setLimitType: function (value) {
    this.limitType = value;
  },
  getLimitType: function () {
    return this.limitType;
  },
  setTypesDescription: function (str) {
    this.typesDescription = str;
  },
  getTypesDescription: function () {
    return this.typesDescription;
  },
  setButtonText: function (value) {
    this.buttonText = value;
    this._buttonEl.innerHTML = value;
  },
  getButtonText: function () {
    return this.buttonText;
  },

  setUploadLimit: function (value) {
    this.uploadLimit = value;
  },

  setQueueLimit: function (value) {
    this.queueLimit = value;
  },
  setFlashUrl: function (value) {
    this.flashUrl = value;
  },

  setUploadUrl: function (value) {
    if (this.swfUpload) {
      this.swfUpload.setUploadURL(value);
    }
    this.uploadUrl = value
  },

  setName: function (value) {
    this.name = value;
  },

  startUpload: function (params) {
    var e = {cancel: false};
    this.fire("beforeupload", e);
    if (e.cancel == true) return;
    if (this.swfUpload) {
      this.swfUpload.setPostParams(this.postParam);
      this.swfUpload.startUpload()
    }
  },

  __on_file_queued: function (file) {
    var e = {file: file};


    if (this.uploadOnSelect) {
      this.startUpload()
    }
    this.setText(file.name);

    this.fire("fileselect", e);
  },
  __on_upload_success: function (file, serverData) {

    var e = {file: file, serverData: serverData};
    this.fire("uploadsuccess", e);

  },
  __on_upload_error: function (file) {
    var e = {file: file};

    this.fire("uploaderror", e);

  },
  __on_upload_complete: function (e) {
    this.fire("uploadcomplete", e);
  },
  __fileError: function () {

  },

  getAttrs: function (el) {
    var attrs = mini.FileUpload.superclass.getAttrs.call(this, el);

    mini._ParseString(el, attrs,
      ["limitType", "limitSize", "flashUrl", "uploadUrl", "uploadLimit", "buttonText",
        "onuploadsuccess", "onuploaderror", "onuploadcomplete", "onfileselect"
      ]
    );

    mini._ParseBool(el, attrs,
      ["uploadOnSelect"
      ]
    );

    return attrs;
  }
});
mini.regClass(mini.FileUpload, "fileupload");