import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
class Filepond extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: 'Dropzone.js',
          options: {
            type: 'local',
          },
        },
      ],
    }
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond)
  }

  handleProcessing(fieldName, file, metadata, load, error, progress, abort, transfer, options) {
    const filename = `${Date.now()}-${file.name}`
    console.log('JEPA JEE')
    console.log(fieldName)
    console.log(file)
    console.log(metadata)
    console.log(transfer)
    console.log(options)
  }

  render() {
    return (
      <div className="App">
        <FilePond
          ref={(ref) => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={true}
          allowReorder={true}
          maxFiles={3}
          accepted-file-types={'image/jpeg, image/png'}
          // server={{
          //   process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          //     this.handleProcessing(fieldName, file, metadata, load, error, progress, abort, transfer, options)

          //     return transfer
          //   },
          // }}
          name="files"
          processfileabort="handleFileProcessAbort"
          oninit={() => this.handleInit()}
          onupdatefiles={(fileItems) => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map((fileItem) => fileItem.file),
            })
          }}
        />
      </div>
    )
  }
}

export default Filepond
