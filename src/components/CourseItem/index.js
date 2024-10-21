import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {eachItem} = props
  const {id, name, logoUrl} = eachItem
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
