import 'bulma/css/bulma.min.css';
import React from 'react';
import Chart from 'react-bulma-chartjs';
import { useState, useEffect} from 'react';

export default function Scores({ photos }) {
    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    };


    function CountLikes(photos) {
        if (photos){
            var cnt = 0;
            photos.map((photo) => (
                cnt = cnt + photo.likes.length
                )
            )
            return cnt
        };
    }

    function CountPhotos(photos) {
        if (photos){
            return photos.length
        };
    }

    var week = getWeekNumber(new Date());
    const data =  {
        labels: [
          'Fit Score', 'Feel Score', 'Eat Score'
        ],
        datasets: [
          {
            data: [
                CountPhotos(photos), CountLikes(photos), CountPhotos(photos)
            ],
            backgroundColor: [
              '#00d1b2', '#3e8ed0', '#485fc7'
            ],
            hoverBackgroundColor: ['#00d1b2', '#3e8ed0', '#485fc7']
          }
        ]
      };
    const options = {
            animateRotate: true
        };
    return (
        // <div>
        //     <div className="w-full bg-gray-200 h-1 mb-6">
        //         <div className="bg-green-500 h-1" style={{ width: '25%' }}>1</div>
        //     </div>
        //     <div className="w-full bg-gray-200 h-1 mb-6">
        //         <div className="bg-blue-400 h-1" style={{ width: '25%' }}>111</div>
        //     </div>
        //     <div className="w-full bg-gray-200 h-1 mb-6">
        //         <div className="bg-yellow-500 h-1" style={{ width: '25%' }}>111</div>
        //     </div>
        //     <div className="w-full bg-gray-200 h-1">
        //         <div className="bg-red-600 h-1" style={{ width: '25%' }}></div>
        //     </div>
        // </div>
        // <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        //     <progress class="progress is-primary" value="15" max="100">15%</progress>
        // </div>
    <div>
        <section class="hero is-white is-small">
        <div class="hero-body">
        <div class="columns">
            <div class="column"></div>
            <div class="column">
                <h1 class="title is-4">Currently Week {week[1]} of {week[0]}</h1>
            </div>
            <div class="column"></div>
        </div>
        </div>
        </section>
        <div class="column">
            <div class="card">
            <div class="card-content skills-content">
                <h3 class="title is-4">Scores This Week</h3>
                <div class="content">

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Fit Score</strong>
                        <br/>
                        <progress class="progress is-primary" value={photos ? photos.length : 0} max="100"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Eat Score</strong>
                        <br/>
                        <progress class="progress is-link" value="90" max="100"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Feel Score</strong>
                        <br/>
                        <progress class="progress is-info" value={CountLikes(photos)} max="100"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Other Score</strong>
                        <br/>
                        <progress class="progress is-warning" value="95" max="100"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Other Score</strong>
                        <br/>
                        <progress class="progress is-danger" value="66" max="100"></progress>
                        </p>
                    </div>
                    </div>
                </article>
                </div>
            </div>
            </div>
        </div>
        <section class="hero is-white is-small">
        <div class="hero-body">
        <div class="columns is-vcentered is-centered">
              <div class="column is-6 has-text-centered">
                <Chart type={'doughnut'} data={data} options={options}/>
              </div>

              <div class="column is-6">
                <h1 class="title is-2 mb-6">
                    Proportion of Each Activity
                </h1>
                <h2 class="subtitle">
                  Track all the exercises you've done in our portal &#8212; be it running, swimming, cycling or even gym workouts
                </h2>
              </div>
        </div>
        </div>
        </section>
    </div>
    );
}