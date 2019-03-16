import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

import Spinner from '../../../../components/Spinner';

import { UploadActions } from '../../../../store/ducks/upload';

import { DropContainer, ThumbContainer, Thumbnail } from './styles';

class Upload extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.uploadedFile !== prevProps.uploadedFile) {
      this.props.onFileChange(this.props.uploadedFile);
    }
  }

  onUpload = (files) => {
    this.props.uploadRequest(files[0]);
  };

  renderUpload() {
    return (
      <Dropzone accept="image/*" onDropAccepted={this.onUpload} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <DropContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <i className="material-icons">camera_alt</i>
          </DropContainer>
        )}
      </Dropzone>
    );
  }

  renderThumbnail() {
    return (
      <ThumbContainer>
        <Thumbnail src={this.props.uploadedFile.url} />
        <button type="button" onClick={this.props.resetUpload}>
          <i className="material-icons">delete</i>
        </button>
      </ThumbContainer>
    );
  }

  render() {
    if (this.props.loading) {
      return (<Spinner />);
    }

    return this.props.uploadedFile ? this.renderThumbnail() : this.renderUpload();
  }
}

Upload.defaultProps = {
  uploadedFile: null,
};

Upload.propTypes = {
  uploadedFile: PropTypes.shape({
    url: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  uploadRequest: PropTypes.func.isRequired,
  resetUpload: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uploadedFile: state.upload.data,
  loading: state.upload.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(UploadActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
