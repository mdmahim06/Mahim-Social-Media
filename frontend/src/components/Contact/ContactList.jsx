import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CONTACT_POST_API } from '../../constants/App.constants';
import axios from 'axios';

const ContactList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const getData = async (url) => {
        setLoading(true);

        await axios
            .get(url)
            .then((res) => {
                setLoading(false);
                setError(false);
                setData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                setData([]);
            });
    };

    useEffect(() => {
        getData(CONTACT_POST_API);
    }, []);

    return (
        <Wrapper>
            {loading ? (
                error ? (
                    'Error...'
                ) : (
                    'Loading'
                )
            ) : !error && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>message</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 &&
                            data.map((curElem, index) => {
                                const no = index + 1;
                                const { id, username, email, message, date } = curElem;

                                return (
                                    <tr key={id}>
                                        <td>{no}</td>
                                        <td>{username}</td>
                                        <td>{email.length > 15 ? email.slice(0, 15) + '...' : email}</td>
                                        <td>{message.length > 15 ? email.slice(0, 15) + '...' : message}</td>
                                        <td>{date}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                'No Data'
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    margin: 10rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    table {
        border-collapse: collapse;
        text-align: center;
        width: 60rem;

        tr,
        td,
        th {
            border: 1px solid #ddd;
        }
        th,
        td {
            padding: 0.5rem 1rem;
        }
        tbody {
            tr {
                transition: all 0.2s;
                cursor: pointer;

                &:hover {
                    background: #ddd;
                    color: black;
                }
            }
        }
    }
`;

export default ContactList;
