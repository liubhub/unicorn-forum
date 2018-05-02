import React, { Component } from 'react';

import shortid from "shortid";

import DataProvider from '../Thread/DataProvider';
import MediaElement from '../Thread/Thread';
const uuid = shortid.generate;

function Threads(elements) {
  const threadList = elements.map(elem => 
    <MediaElement thread={elem}  key ={uuid()}/>
  );
  return (
    <div> {threadList} </div>
  )
}

const ThreadList = () => (
  <DataProvider endpoint="api/threads/" render={data => 
    Threads(data)
  } 
  />
);

export default ThreadList;