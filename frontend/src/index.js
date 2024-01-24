import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProfileContextProvider } from './context/profile.context';
import { PostsContextProvider } from './context/posts.context';
import { AllPostsContextProvider } from './context/All.Posts.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ProfileContextProvider>
        <PostsContextProvider>
            <AllPostsContextProvider>
                <App />
            </AllPostsContextProvider>
        </PostsContextProvider>
    </ProfileContextProvider>
);
