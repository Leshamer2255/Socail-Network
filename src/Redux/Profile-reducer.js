import { profileAPI, usersAPI } from "./api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts:[
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 2, message: 'It`s my first post', likesCount: 11 },
        { id: 3, message: 'What are you talking about', likesCount: 13 },
        { id: 4, message: 'I don`t understand what it happens', likesCount: 15 },
        { id: 5, message: 'Fight', likesCount: 111 }
    ],
    profile: null,
    status:" "
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
            id: 6,
            message: action.newPostText,
            likesCount: 0
        };
        return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: ''
        };
    }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST,newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})


export const getUserProfile = (userId) => async (dispatch) => {
   let Response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile (Response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let Response = await profileAPI.getStatus(userId)
        dispatch(setStatus(Response.data));

}

export const updateStatus = (status) => async (dispatch) => {
    let Response = await profileAPI.updateStatus(status)
        if (Response.data.resultCode === 0) {
        dispatch(setStatus(status));
        }
}

export default profileReducer;














// let a = {    
//   name:'pikatchu',
//   protocol: 'htpps',
//   maxStudentCount: 10,
//   isOnline: true,
//   students: ['van', 'drey', 'arid'],
//   classroom: {
//     teacher:{
//       name:'Lesha',
//       age:23  
//     }
//   }
// }

// let b = {...a};
// b.classroom = {...a.classroom};
// b.classroom.teacher = {...a.classroom.teacher};
// b.students = [...a.students];

// b.classroom.teacher.name = 'Ant0n';

// console.log(b.classroom.teacher.name)