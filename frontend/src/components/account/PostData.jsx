import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import ProfilePostView from './Profile.postView';

const PostData = ({ view }) => {
    return (
        <Wrapper>
            {view !== false ? null : (
                <div className="createPost">
                    <NavLink to="/createpost">
                        <MdOutlineAddBox className="icon" />
                        Post
                    </NavLink>
                </div>
            )}

            <div className="posts">
                <h1>Posts :-</h1>
                <ProfilePostView view={view !== false ? view : false} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 100%;

    .createPost {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-bottom: 2rem;

        a {
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 600;
            background: #ddd;
            color: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1.5rem;
            width: 8rem;
            transition: all 0.2s;

            .icon {
                font-size: 1.5rem;
            }
            &:hover {
                transform: scale(0.97);
            }

            &:focus {
                transform: scale(0.97);
                filter: brightness(0.6);
            }
        }
    }
    .posts {
        margin-left: 1.5rem;
    }
`;

export default PostData;
