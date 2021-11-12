import React from 'react'
import Dropzone from 'react-dynamic-dropzone'

class DropzoneDemo extends React.Component {
  onDrop = (files) => {
    console.log('Received files: ', files)
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
}

export default DropzoneDemo
// React.render(<DropzoneDemo />, document.body)
