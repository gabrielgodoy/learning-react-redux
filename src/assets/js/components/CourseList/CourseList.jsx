import React, { PropTypes } from 'react';
import CourseListItem from '../CourseListItem/CourseListItem';

const CoursesList = ({ courses }) => (
  <div>
    {courses.map(course => <CourseListItem course={course} key={course.id} />)}
  </div>
);

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default CoursesList;
