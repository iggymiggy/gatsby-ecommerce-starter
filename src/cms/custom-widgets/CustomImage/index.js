import NetlifyCmsWidgetFile from 'netlify-cms-widget-file'

import previewComponent from './ImagePreview'
import Filepond from './ImageControl'
import schema from './schema'

// const controlComponent = NetlifyCmsWidgetFile.withFileControl({ forImage: true })
// const controlComponent = NetlifyCmsWidgetFile.withFileControl({ forImage: true })

function Widget(opts = {}) {
  return {
    name: 'customImage',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  }
}

export const NetlifyCmsWidgetCustomImage = { Widget, Filepond, previewComponent }
export default NetlifyCmsWidgetCustomImage
