import React, { Component } from 'react';
import './Styles/HomeView.css';

import Post from './Post';

export default class HomeView extends Component {
    render() {
        let data = this.props.data;

        if(data === undefined)
        {
            return <div>
                <div id="posts">
                </div>
            </div>
        }
        else
        {

            //Define an array to hold posts.
            let posts = [];

            for (let i = 0; i < Math.min(5 * this.props.page, data.length); i++)
            {
                posts.push(<Post key={i} id={data[i]._id} title={data[i].title} image={data[i].file} clickEvent={this.props.viewPostEvent}/>)
            }


            return <div>
                <div id="posts">
                    {posts}
                </div>
            </div>
        }
    }

    addPosts() {

    }
}
