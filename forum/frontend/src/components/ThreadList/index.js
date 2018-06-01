import React, { Component } from 'react';

import shortid from "shortid";

import DataProvider from '../Thread/DataProvider';
import {MediaElement} from '../Thread';
const uuid = shortid.generate;

function Threads(elements) {
    const threadList = elements.map(elem =>
        <MediaElement thread={elem} key={uuid()} />
    );
    return (
        <div> {threadList} </div>
    )
}

const ThreadList = () => (
    <DataProvider endpoint="api/threads/" render={data =>{
            data.sort(function(a,b){
                var date_a = a.comments.length == 0 ? a.created_at : a.comments[0].created_at;
                var date_b = b.comments.length == 0 ? b.created_at : b.comments[0].created_at;
                return new Date(date_b) - new Date(date_a);
            })

            return Threads(data)
        }
    }
    />
);

export default ThreadList;