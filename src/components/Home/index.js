import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'
import './index.css'

const userStatus = {
  initail: 'INITIAL',
  inProgeress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], statusIs: userStatus.initail}

  componentDidMount() {
    this.gettingCourses()
  }

  gettingCourses = async () => {
    this.setState({
      statusIs: userStatus.inProgeress,
    })
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const courseData = data.courses
      const updatedCourseData = courseData.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        courseList: updatedCourseData,
        statusIs: userStatus.success,
      })
    } else {
      this.setState({
        statusIs: userStatus.failure,
      })
    }
  }

  renderSuccess = () => {
    const {courseList} = this.state
    return (
      <div>
        <Header />
        <div className="courses-container">
          <h1 className="courses-heading">Courses</h1>
          <ul className="course-list-container">
            {courseList.map(eachItem => (
              <CourseItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
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
        <button
          className="retry-button"
          type="button"
          onClick={this.gettingCourses}
        >
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

export default Home
