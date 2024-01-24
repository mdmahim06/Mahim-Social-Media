import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePostsContext } from '../context/posts.context';
import Loading from '../assets/images/layouts/Loading';

const Post = () => {
    const { id } = useParams();

    const { getSinglePosts, singlePost } = usePostsContext();
    const { loading, post } = singlePost;
    const { title, content, token, image, avatar, username } = post;

    useEffect(() => {
        getSinglePosts(id);
    }, []);
    return (
        <Wrapper>
            {loading === true ? (
                <Loading className="loading" />
            ) : (
                post && (
                    <div className="post">
                        <div className="post-image">
                            <img src={image} alt={title} />
                        </div>
                        <div className="post-content">
                            <div className="profile">
                                <img src={avatar} alt={username} />
                                <NavLink to={`/profile/${username}`}>{username}</NavLink>
                            </div>
                            <h3>{title}</h3>
                            <p>{content}</p>
                        </div>
                    </div>
                )
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    margin: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .post {
        width: 62rem;
        padding: 0.8rem 5rem;
        background: #ddd;
        color: #333;
        display: flex;
        border-radius: 0.5rem;

        .post-content {
            .profile {
                display: flex;
                justify-content: start;
                align-items: center;

                img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    border: 1px solid #333;
                    margin-right: 0.5rem;
                }
                a {
                    color: #333;
                    transition: all 0.2s;

                    &:hover {
                        color: black;
                        text-decoration: underline;
                    }
                }
            }

            h3 {
                margin: 1rem 0;
            }
            p {
                width: 100%;
            }
        }

        .post-image {
            margin-right: 2rem;
            img {
                width: 20rem;
            }
        }
    }

    .loading {
        width: 40rem;
        margin: 0 auto;
    }
`;

export default Post;
