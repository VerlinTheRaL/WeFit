import 'bulma/css/bulma.min.css';
import React from 'react';
import Chart from 'react-bulma-chartjs';

export default function Scores({ calories, activity, popularity }) {
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

    if (!calories){
        console.log('helper', 'no caloroies');
    }

    const calorie_progress = calories / 500;
    const activity_progress = activity / 10;
    const popularity_progress = popularity / 10;
    const total = calorie_progress + activity_progress + popularity_progress;
    const min = Math.min(calorie_progress, activity_progress, popularity_progress);
    var weakness = 'Null';
    switch (min){
        case popularity_progress:
            weakness = 'Popularity of posts';
            break;
        case activity_progress:
            weakness = 'Exercise frequency';
            break;
        case calorie_progress:
            weakness = 'Calorie burned during exercise';
            break;
        default:
            weakness = 'Nothing';
            break;
    }
    

    var week = getWeekNumber(new Date());
    const data =  {
        labels: [
          'Fitness Score', 'Activity Score', 'Popularity Score'
        ],
        datasets: [
          {
            data: [
                calorie_progress / (total), activity_progress / (total), popularity_progress / (total)
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
                        <strong>Fitness Score</strong>
                        <br/>
                        <progress class="progress is-primary" value={calories} max="500"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Activity Score</strong>
                        <br/>
                        <progress class="progress is-link" value={activity} max="10"></progress>
                        </p>
                    </div>
                    </div>
                </article>

                <article class="media">
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>Popularity Score</strong>
                        <br/>
                        <progress class="progress is-info" value={popularity} max="10"></progress>
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
            {!calories
            ?<p className="text-center text-2xl">No Exercise Records Yet</p>
            :
            <div class="columns is-vcentered is-centered">
                <div class="column is-6 has-text-centered">
                    <Chart type={'doughnut'} data={data} options={options}/>
                </div>

                <div class="column is-6">
                    <h1 class="title is-2 mb-6">
                        Proportion of Each Score
                    </h1>
                    <h2 class="subtitle">
                    Track all the compositions of training this week &#8212; try to achieve a balanced training style! {weakness} is your weakness at present.
                    </h2>
                </div>
            </div>
            }
        </div>
        </section>
    </div>
    );
}