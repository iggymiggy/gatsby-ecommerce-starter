import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

// import NetlifyCmsWidgetCustomImage from './custom-widgets/CustomImage'

import AboutPagePreview from './preview-templates/AboutPagePreview'
// import BlogPostPreview from './preview-templates/BlogPostPreview'
// import ProductPagePreview from './preview-templates/ProductPagePreview'
// import KitePagePreview from './preview-templates/KitePagePreview'
// import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

// CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
// CMS.registerPreviewTemplate('products', ProductPagePreview)
// CMS.registerPreviewTemplate('kites', KitePagePreview)
// CMS.registerPreviewTemplate('blog', BlogPostPreview)

// CMS.registerWidget('customImage', NetlifyCmsWidgetCustomImage.Filepond, NetlifyCmsWidgetCustomImage.previewComponent)

// CMS.init()
