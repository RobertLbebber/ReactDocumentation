import React, { Component } from "react";
import PropTypes from "prop-types";
//import func from '/frontend/src/util/func/func'
import Dropzone from "react-dropzone";

/**
 * https://react-dropzone.js.org/
 */
export class FileUploader extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    console.log(files);
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    console.log(this.state.files);
    return (
      <Dropzone onDrop={this.onDrop} accept={this.props.accept} {...this.props}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={
                "dropzone" + (isDragActive ? " dropzone--isActive" : "")
              }
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>{this.props.dragText}</p>
              ) : (
                <p>{this.props.nonDragText}</p>
              )}
            </div>
          );
        }}
      </Dropzone>
    );
  }

  static propTypes = {
    dragText: PropTypes.string,
    nonDragText: PropTypes.string,

    /**
     * ---------------------------------------------------------------------------------------------------------------------------------------------------------
     *                                                                API FROM REACT-DROPZONE
     * ---------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    /**
     * Allow specific types of files. See https://github.com/okonet/attr-accept for more information. Keep in mind that mime type determination is not reliable
     * across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might
     * not be a mime type set at all. See: https://github.com/react-dropzone/react-dropzone/issues/276
     */
    accept: PropTypes.string,
    /**Render function that renders the actual component*/
    children: PropTypes.func,

    /**Enable/disable the dropzone entirely*/
    disabled: PropTypes.bool,
    getDataTransferItems: PropTypes.func,
    /**Maximum file size (in bytes)*/
    maxSize: PropTypes.number,
    /**Minimum file size (in bytes)*/
    minSize: PropTypes.number,

    /*Allow dropping multiple files*/
    multiple: PropTypes.bool,
    /** name attribute for the input tag */
    name: PropTypes.string,

    onBlur: PropTypes.func,

    onClick: PropTypes.func,

    onDragEnter: PropTypes.func,

    onDragLeave: PropTypes.func,

    onDragOver: PropTypes.func,

    onDragStart: PropTypes.func,

    /**
     * The onDrop method that accepts two arguments. The first argument represents the accepted files and the second argument the rejected files.
     * Files are accepted or rejected based on the accept prop. This must be a valid MIME type according to input element specification or a valid file extension.
     * Note that the onDrop callback will always be called regardless if the dropped files were accepted or rejected. You can use the onDropAccepted/onDropRejected
     * props if you'd like to react to a specific event instead of the onDrop prop.
     */
    getOnDrop: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    /**Provide a callback on clicking the cancel button of the file dialog */

    onFileDialogCancel: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**  If false, allow dropped items to take over the current browser window*/
    preventDropOnDocument: PropTypes.bool
  };

  static defaultProps = {
    dragText:
      "Try dropping some files here, or click to select files to upload.",
    nonDragText: "Click to select files to upload.",

    accept: "image/*",
    disable: false,
    minSize: Infinity,
    minSize: 0,
    multiple: true,
    preventDropOnDocument: true
  };
}
export default FileUploader;
