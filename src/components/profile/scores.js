import 'bulma/css/bulma.min.css';
import React from 'react';
import Chart from 'react-bulma-chartjs';

export default function Scores({ calories, activity, popularity }) {
    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    };

    if (!calories) {
        console.log('helper', 'no caloroies');
    }

    const calorie_progress = calories / 500;
    const activity_progress = activity / 10;
    const popularity_progress = popularity / 10;
    const total = calorie_progress + activity_progress + popularity_progress;
    const min = Math.min(calorie_progress, activity_progress, popularity_progress);
    const max = Math.max(calorie_progress, activity_progress, popularity_progress);
    var weakness = 'Null';
    var strength = 'Null';
    switch (max) {
        case popularity_progress:
            strength = "Good job, you're really engaging with your friends this week! Healthy competition is great for keeping you motivated!";
            break;
        case activity_progress:
            strength = "Good job, you've already completed a ton of workouts this week! Let's keep up that pace and finish the week strong!";
            break;
        case calorie_progress:
            strength = "Good job, you're burning a lot of calories this week! Keep going and get that beach body!";
            break;
        default:
            strength = "Let's get some workouts going!";
            break;
    }
    switch (min) {
        case popularity_progress:
            weakness = "And it would be awesome if you could engage with your friends a little more! Having a little healthy competetition is great for keeping you motivated!";
            break;
        case activity_progress:
            weakness = "And it would be awesome if you aim to complete a few more workouts this week! Consistency is key to long-term fitness!";
            break;
        case calorie_progress:
            weakness = "And it would be awesome if you push yourself a little longer and harder each workout! Remember that sweat is just fats crying!";
            break;
        default:
            weakness = "Don't give up!";
            break;
    }


    var week = getWeekNumber(new Date());
    const data = {
        labels: [
            'Calories Burnt', 'Workouts Completed', 'Social Activity'
        ],
        datasets: [
            {
                data: [
                    calorie_progress / (total), activity_progress / (total), popularity_progress / (total)
                ],
                backgroundColor: [
                    '#209cee', '#ffdd57', '#ff3860'
                ],
                hoverBackgroundColor: ['#209cee', '#ffdd57', '#ff3860']
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
                            <h1 class="title is-5">Currently Week {week[1]} of Year {week[0]}</h1>
                        </div>
                        <div class="column"></div>
                    </div>
                </div>
            </section>
            <div class="column">
                <div class="card">
                    <div class="card-content skills-content">
                        <h3 class="title is-4 mb-6">Weekly Workout Score:</h3>
                        <div class="content">

                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>Calories Burnt</strong>
                                            <br />
                                            <progress class="progress is-info" value={calories} max="500"></progress>
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>Workouts Completed</strong>
                                            <br />
                                            <progress class="progress is-warning" value={activity} max="10"></progress>
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>Social Activity</strong>
                                            <br />
                                            <progress class="progress is-danger" value={popularity} max="10"></progress>
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
                        ? <p className="text-center text-2xl">No Exercise Records Yet</p>
                        :
                        <div class="columns is-vcentered is-centered">
                            <div class="column is-6 has-text-centered">
                                <Chart type={'doughnut'} data={data} options={options} />
                            </div>

                            <div class="column is-6">
                                <h1 class="title is-4 mb-6">
                                    Weekly Workout Score Analysis
                                </h1>
                                <h2 class="subtitle">
                                    {strength}
                                </h2>
                                <h2 class="subtitle">
                                    {weakness}
                                </h2>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}