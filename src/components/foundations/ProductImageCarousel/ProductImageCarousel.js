import React from 'react'
import ImageGallery from './react-image-gallery/src/ImageGallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './ProductImageCarousel.css'
import ReactPlayer from 'react-player'

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
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: true,
      thumbnailPosition: 'left',
      showVideo: {},
      useWindowKeyDown: true,
      handle: undefined,
    }

    this.items = Object.keys(this.props.items).map((keyName) => {
      if (typeof this.props.items[keyName].embedUrl !== 'undefined') {
        return { ...this.props.items[keyName], renderItem: this._renderVideo.bind(this) }
      }
      return this.props.items[keyName]
    })
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
      },
    })

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
    // this.setState({
    //   showNav: false,
    //   showBullets: false,
    //   showFullscreenButton: false,
    //   showGalleryFullscreenButton: false,
    //   showIndex: false,

    //   // isButtonDisabled: true
    // })

    console.debug('_mouseLeave')
  }

  _mouseOver() {
    // event.preventDefault();

    // this.setState({
    //   showNav: true,
    //   showBullets: true,
    //   showFullscreenButton: true,
    //   showGalleryFullscreenButton: true,
    //   showIndex: true,
    // })
    console.debug('_mouseOver')
  }

  _renderVideo(item) {
    return (
      <div>
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a className="close-video" onClick={this._toggleShowVideo.bind(this, item.embedUrl)} />
            {/* <iframe width="560" height="315" src={item.embedUrl} frameBorder="0" allowFullScreen /> */}
            <ReactPlayer
              url={item.embedUrl}
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
