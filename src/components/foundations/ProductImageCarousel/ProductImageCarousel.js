import React from 'react'
import ImageGallery from './react-image-gallery/src/ImageGallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import './ProductImageCarousel.css'
import ReactPlayer from 'react-player'
// import React from 'react';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/'

class ProductImageCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showIndex: true,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: false,
      showGalleryPlayButton: true,
      showNav: false,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
      handle: undefined,
    }

    // console.log("this.items!!!!!!!!!!!!!!!!!!")
    // console.log(this.props.items)
    // const listItems = this.props.items.map((item) =>
    //     item
    // );
    // console.log("listItems")
    // console.log(listItems)

    // console.log("this.images!!!!!!!!!!!!!!!!!!")
    // console.log(this.props.images)
    // const listImages = this.props.images.map((item) =>
    //     item
    // );
    // console.log("listImages")
    // console.log(listImages)
    // console.log(Object.keys(this.props.items))
    this.items = Object.keys(this.props.items).map((keyName, keyIndex) => {
      // console.log("keyName: " + keyName)
      // console.log("keyIndex: " + keyIndex)
      // console.log(this.props.items[keyName])
      if (typeof this.props.items[keyName].embedUrl !== 'undefined') {

        return { ...this.props.items[keyName], renderItem: this._renderVideo.bind(this) }
      }
      return this.props.items[keyName]
    })


    // this.items = []

    // this.props.items.forEach(element => {
    //   console.log("element!!!!!!!!!!!!!!!!!")
    //   console.log(element)
    //   console.log(element.embedUrl)
    //   if (typeof element.embedUrl !== 'undefined') {
    //     const item = {
    //       ...element,
    //       renderItem: this._renderVideo.bind(this)
    //     }
    //     this.items.push(item)
    //   } else {
    //     this.items.push(element)
    //   }

    // });
    // console.log('ProductImageCarousel items')
    // console.log(this.props.items)
    // console.log(this.items)




    // this.items = [
    //   {
    //     thumbnail: `${PREFIX_URL}4v.jpg`,
    //     original: `${PREFIX_URL}4v.jpg`,
    //     embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
    //     description: 'Play video',
    //     renderItem: this._renderVideo.bind(this),
    //   },
    //   {
    //     original: `${PREFIX_URL}image_set_default.jpg`,
    //     thumbnail: `${PREFIX_URL}image_set_thumb.jpg`,
    //     imageSet: [
    //       {
    //         srcSet: `${PREFIX_URL}image_set_cropped.jpg`,
    //         media: '(max-width: 1280px)',
    //       },
    //       {
    //         srcSet: `${PREFIX_URL}image_set_default.jpg`,
    //         media: '(min-width: 1280px)',
    //       },
    //     ],
    //   },
    //   {
    //     original: `${PREFIX_URL}1.jpg`,
    //     thumbnail: `${PREFIX_URL}1t.jpg`,
    //     // originalClass: 'featured-slide',
    //     // thumbnailClass: 'featured-thumb',
    //     description: 'Custom class for slides & thumbnails',
    //   },
    // // ].concat(this._getStaticImages())
    // ]
  }

  _onImageClick(event) {
    this._mouseOver()
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex())
  }

  // _onImageLoad(event) {
  //   console.debug('loaded image', event.target.src)
  // }

  _onSlide(index) {
    this._resetVideo()
    console.debug('slid to index', index)
  }

  _onPause(index) {
    console.debug('paused on index', index)
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement)
  }

  _onPlay(index) {
    console.debug('playing from index', index)
  }

  _handleInputChange(state, event) {
    if (event.target.value > 0) {
      this.setState({ [state]: event.target.value })
    }
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked })
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value })
  }

  // _getStaticImages() {
  //   const images = []
  //   for (let i = 2; i < 12; i++) {
  //     images.push({
  //       original: `${PREFIX_URL}${i}.jpg`,
  //       thumbnail: `${PREFIX_URL}${i}t.jpg`,
  //     })
  //   }

  //   return images
  // }

  _resetVideo() {
    this.setState({ showVideo: {} })

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true })
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true })
    }
  }

  _toggleShowVideo(url) {

    this.setState({
      showVideo: {
        [url]: !this.state.showVideo[url],
      }
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false })
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false })
      }
    }
  }

  _mouseLeave() {
    this.setState({
      showNav: false,
      showBullets: false,
      showFullscreenButton: false,
      showGalleryFullscreenButton: false,
      showIndex: false,

      // isButtonDisabled: true
    })

    console.debug('_mouseLeave')
  }

  _mouseOver() {
    // event.preventDefault();

    this.setState({
      showNav: true,
      showBullets: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showIndex: true,
    })

  }

  _renderVideo(item) {
    return (
      <div>
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a className="close-video" onClick={this._toggleShowVideo.bind(this, item.embedUrl)} />
            {/* <iframe width="560" height="315" src={item.embedUrl} frameBorder="0" allowFullScreen /> */}
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              config={{
                youtube: {
                  playerVars: { showinfo: 1, autoplay: 1, controls: 1 },
                },
              }}
            />
            {/* <iframe width="560" height="315" src={item.embedUrl} frameBorder="0" allowFullScreen /> */}
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button" />
            <img className="image-gallery-image" src={item.original} />
            {item.description && (
              <span className="image-gallery-description" style={{ right: '0', left: 'initial' }}>
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    )
  }

  render() {
    // const { items } = this.props

    return (
      <div onMouseOver={this._mouseOver.bind(this)} onMouseLeave={this._mouseLeave.bind(this)}>
        <ImageGallery
          ref={(i) => (this._imageGallery = i)}
          items={this.items}
          lazyLoad
          onClick={this._onImageClick.bind(this)}
          // onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          // showNav={this._mouseOver.bind(this)}
          isRTL={this.state.isRTL}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          additionalClass="app-image-gallery"
          useWindowKeyDown={this.state.useWindowKeyDown}
        />
      </div>
    )
  }
}

export default ProductImageCarousel

// ReactDOM.render(<App/>, document.getElementById('root'));
