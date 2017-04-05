import * as types from './CoursesConstants';
import CourseApi from '../../../../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses,
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSES_SUCCESS,
    course,
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSES_SUCCESS,
    course,
  };
}

export function loadCourses() {
  return function(dispatch) { // eslint-disable-line
    return CourseApi.getAllCourses().then((courses) => {
      dispatch(loadCoursesSuccess(courses));
    }).catch((error) => {
      throw error;
    });
  };
}

// Save or update a course
export function saveCourse(course) {
  // getState can get pieces of state from store to use inside the thunk
  return function(dispatch, getState) {  // eslint-disable-line
    return CourseApi.saveCourse(course).then(savedCourse => // eslint-disable-line
      savedCourse.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse)) // eslint-disable-line
    ).catch((error) => {
      throw (error);
    });
  };
}
