import { useEffect, useState } from 'react';
import { usePostsContext } from '../../context/posts.context';
import styled from 'styled-components';
import Loading from '../../assets/images/layouts/Loading';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ProfilePostView = ({ view }) => {
    const { loading, posts, getPosts } = usePostsContext();
    const initialState = {
        posts: [],
        loading: false
    };
    const [pPosts, setPposts] = useState(initialState);

    const getPposts = async (username) => {
        setPposts({
            ...pPosts,
            loading: true,
            posts: []
        });
        await axios.get(`http://localhost/mahim-social/backend/posts/allPostsUseUsername.php?username=${username}`).then((res) => {
            if (res.data === 404) {
                setPposts({
                    ...pPosts,
                    loading: false,
                    posts: []
                });
            } else {
                setPposts({
                    ...pPosts,
                    loading: false,
                    posts: res.data
                });
            }
        });
    };

    useEffect(() => {
        if (view !== false) {
            getPposts(view);
        } else {
            setPposts(initialState);
            getPosts();
        }
    }, [view]);

    return (
        <Wrapper>
            {view !== false ? (
                pPosts.loading === true ? (
                    <Loading className="loading" />
                ) : (
                    <div className="posts">
                        {pPosts.posts.length >= 0 ? (
                            pPosts.posts.map((curElem) => {
                                const { id, title, content, image } = curElem;
                                return (
                                    <NavLink to={`/post/${id}`} key={id}>
                                        <div className="post">
                                            <div className="post-image">
                                                <img src={image} alt={title} />
                                            </div>
                                            <div className="post-content">
                                                <h3>{title.length >= 30 ? title.slice(0, 30) + '...' : title}</h3>
                                                <p>{content.length >= 30 ? content.slice(0, 30) + '...' : content}</p>
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
                )
            ) : loading === true ? (
                <Loading className="loading" />
            ) : (
                <div className="posts">
                    {posts.length >= 0 ? (
                        posts.map((curElem) => {
                            const { id, title, content, image } = curElem;
                            return (
                                <NavLink to={`/post/${id}`} key={id}>
                                    <div className="post">
                                        <div className="post-image">
                                            <img src={image} alt={title} />
                                        </div>
                                        <div className="post-content">
                                            <h3>{title.length >= 30 ? title.slice(0, 30) + '...' : title}</h3>
                                            <p>{content.length >= 30 ? content.slice(0, 30) + '...' : content}</p>
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
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    margin-top: 1.5rem;

    .posts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;

        a {
            transition: all 0.2s;

            .post {
                background: #ddd;
                color: #333;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 2rem 0;
                width: 22rem;
                height: 25rem;

                .post-image {
                    width: 75%;
                    img {
                        width: 100%;
                        height: 18rem;
                        border-radius: 0.5rem;
                        object-fit: cover;
                        object-position: center;
                    }
                }
                .post-content {
                    margin-top: 1rem;
                }

                &:hover {
                    color: black;
                }
            }

            &:hover {
                transform: scale(0.97);
                filter: brightness(0.6);
            }
        }
    }

    .loading {
        width: 40%;
        margin: 0 auto;
    }
`;

export default ProfilePostView;
