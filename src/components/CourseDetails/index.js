import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const userStatus = {
  initail: 'INITIAL',
  inProgeress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CourseDetails extends Component {
  state = {courseDetailsList: [], statusIs: userStatus.initail}

  componentDidMount() {
    this.gettingCourseDetails()
  }

  gettingCourseDetails = async () => {
    this.setState({
      statusIs: userStatus.inProgeress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedDetails = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }
      this.setState({
        courseDetailsList: updatedDetails,
        statusIs: userStatus.success,
      })
    } else {
      this.setState({
        statusIs: userStatus.failure,
      })
    }
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div className="falure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-button" type="button">
          Retry
        </button>
      </div>
    </div>
  )

  renderLoderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#4656a1"
        height="50"
        width="50"
        className="loader"
      />
    </div>
  )

  renderSuccess = () => {
    const {courseDetailsList} = this.state
    return (
      <div>
        <Header />
        <div className="course-details-contaniner">
          <img src={courseDetailsList.imageUrl} alt={courseDetailsList.name} />
          <div className="details-container">
            <h1 className="course-name-heading">{courseDetailsList.name}</h1>
            <p className="course-description">
              {courseDetailsList.description}
            </p>
            <button
              className="retry-button"
              type="button"
              onClick={this.gettingCourseDetails}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderDetails = () => {
    const {statusIs} = this.state
    switch (statusIs) {
      case userStatus.inProgeress:
        return this.renderLoderView()
      case userStatus.success:
        return this.renderSuccess()
      case userStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderDetails()}</>
  }
}

export default CourseDetails
