import React, { Component } from 'react'
import './css/mediaMd.css'
import './css/mediaXs.css'
import './css/topImage.css'
import axios from 'axios'
import Switch from 'react-switch'

class TopImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: '',
      imageArray: [],
      searchValue: 'cats',
      toggleOn: false,
    }
  }

  componentDidMount() {
    this.fetchImageData()
  }

  fetchImageData() {
    const url =
      'https://api.imgur.com/3/gallery/search/time/?q=' + this.state.searchValue
    axios
      .get(url, {
        headers: {
          Authorization: 'Client-ID 6594e61ec77d5b1',
        },
      })
      .then((res) => {
        const response = res.data
        this.setState({ imageArray: response.data })
      })
  }
  handleChangeInput(e) {
    this.setState({ searchValue: e.target.value })
  }
  toggleFunction() {
    this.setState({ toggleOn: !this.state.toggleOn })
  }

  renderCardContent(image) {
    return (
      <div class="col-md-3">
        <div className="card">
          <div class="card-body">
            <h5 class="card-title">{image.title}</h5>
            <p class="card-text">
              Date Of Post:
              {new Date(image.datetime * 1000).toDateString()} <br /> No. of
              Images:
              {image.images_count}
            </p>
            <br />
            {image.images && image.images.length ? (
              <img
                src={image.images[0].link}
                alt=""
                className="cardImage"
              ></img>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const me = this

    const { toggleOn } = me.state
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 headTitle">Imgur - Top Image of The Week</h1>
          <hr className="my-4"></hr>
        </div>

        <div class="searchWrapper">
          <input
            type="searchParam"
            className="searchInputField"
            id="search"
            placeholder="Search..."
            onChange={(event) => me.handleChangeInput(event)}
          ></input>
          <button
            type="button"
            onClick={() => me.fetchImageData()}
            className="btn btn-primary searchBtn"
          >
            Search
          </button>
          <label className="toggleLabel">
            <Switch
              onChange={() => me.toggleFunction()}
              checked={me.state.toggleOn}
            />
          </label>
        </div>

        {me.state.imageArray.length ? (
          <div class="row contentRow">
            {me.state.imageArray.length
              ? me.state.imageArray.map(function (image, i) {
                  return toggleOn
                    ? (image.topic_id + image.score + image.points) % 2 === 0 &&
                        me.renderCardContent(image)
                    : me.renderCardContent(image)
                })
              : null}
          </div>
        ) : (
          <div>
            <p className="noData">No Data!!! Please Search Again</p>
          </div>
        )}
      </div>
    )
  }
}

export default TopImage
