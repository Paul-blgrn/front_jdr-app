import { data } from "react-router-dom";
import configureStore from "redux-mock-store";
import {
    LOGIN_USER_REQUEST
} from '../actions/userActions'

import { loginUser } from "../actions/userActions";
import { thunk as thunkMiddleware } from 'redux-thunk';



describe("testing synchronous actions", () => {
    const middleware = [thunkMiddleware];
    const mockStore = configureStore(middleware);

    const initialState = {
        user: null,
        isLoggedIn: false,
        isRegistering: false,
        loading: false,
        error: null,
    };

    const store = mockStore(initialState);
    it('should create an action to login in an user', () => {
        // given
        const data = [
            { id: 1, name: "test" },
            { id: 2, name: "Jean" },
            { id: 3, name: "Pierre" },
        ]
        const user_0 = data[0];
        const expectedPayload = [
            {
                type: LOGIN_USER_REQUEST,
                payload: data[0],
            },
        ];

        //when
        const actions = store.getActions();
        store.dispatch(loginUser(user_0));

        //then
        expect(actions).toEqual(expectedPayload);
    });


});