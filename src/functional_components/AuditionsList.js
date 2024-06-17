import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuditions } from './AuditionSlice';

const AuditionsList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.auditions);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuditions());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <p>Loading...</p>;
    } else if (status === 'succeeded') {
        content = (
            <ul>
                {items.map((audition) => (
                    <li key={audition.id}>{audition.auditionDescription}</li>
                ))}
            </ul>
        );
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div>
            <h2>Auditions</h2>
            {content}
        </div>
    );
};

export default AuditionsList;
