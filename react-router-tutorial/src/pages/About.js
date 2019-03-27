import React from 'react';
import queryString from 'querystringify';

const About = ({location, match}) => {

    const query = queryString.parse(location.search);
    const {color } = query;

    console.log(query);
    return (
        <div>
            <h2 style={{color}}>소개</h2>
            <p>
                안녕하세요, 저는 {match.params.name} 입니다.<br/>
                리액트 라우터입니다.
            </p>
        </div>
    );
};

export default About;