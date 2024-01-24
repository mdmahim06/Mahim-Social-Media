import React, { useEffect } from 'react';
import { useAllPostsContext } from '../context/All.Posts.context';
import styled from 'styled-components';
import Loading from '../assets/images/layouts/Loading';
import { NavLink } from 'react-router-dom';

const Posts = () => {
    const { getAllPosts, loading, allPosts } = useAllPostsContext();

    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <Wrapper>
            {loading === false ? (
                <div className="posts">
                    {allPosts && allPosts.length > 0 ? (
                        allPosts.map((post) => {
                            const { id, title, content, image } = post;
                            return (
                                <NavLink to={`/post/${id}`}>
                                    <div className="post" key={id}>
                                        <div className="post-img">
                                            <img src={image} alt={title} />
                                        </div>
                                        <div className="post-content">
                                            <h3>{title.length >= 32 ? title.slice(0, 32) + '...' : title}</h3>
                                            <p>{content.length >= 32 ? content.slice(0, 32) + '...' : content}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })
                    ) : (
                        <div className="no-posts">
                            <h3>No Posts Yet</h3>
                        </div>
                    )}
                </div>
            ) : (
                <Loading className="loading" />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 5rem;

    .posts {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        justify-content: center;
        align-items: center;

        .post {
            background: #ddd;
            color: #333;
            transition: all 0.2s;
            border-radius: 1rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            cursor: pointer;
            width: 22rem;
            height: 25rem;

            .post-content {
                h3 {
                    margin: 0.5rem 0;
                }
            }

            .post-img {
                img {
                    width: 18rem;
                    height: 18rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    object-fit: cover;
                    object-position: center;
                }
            }

            &:hover {
                filter: brightness(0.8);
                transform: scale(0.97);
                color: #000;
            }
        }

        .no-posts {
            font-size: 2.8rem;
            padding: 2rem;
        }
    }
    .loading {
        width: 25rem;
    }
`;

export default Posts;
