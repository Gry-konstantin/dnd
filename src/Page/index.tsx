import React, {useState} from 'react';
import Hollow from '../Components/Hollow'
import Header from '../Components/Header'


function Page() {
  return (
    <div>
        <Header/>
        <Hollow id = "hollow" className = "hollow"/>
    </div>
  );
}

export default Page;
