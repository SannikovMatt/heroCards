document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let wraper = document.querySelector('.wraper'),
        data;


    const createCardSet = ({ photo, actors, name, status, gender, species, movies }) => {

        let actor = document.createElement('div'),
            li = document.createElement('li');




        actor.innerHTML = `
        <div id='actor'>
        <div class="front">
            <img src="./${photo}" alt="${photo}">
    
           <div id = 'movie__name'> <h1 id = 'movie__name' >${name}</h1></div>
        </div>
        <div class="back">
        <div class = "image"><img src="./dbimage/americaShield.png" alt=""></div>
        <div id= "info">


${status ? '<div class="inner__info">' + status + '</div>' : ''}
${gender ? '<div class="inner__info">' + gender + '</div>' : ''}
${species ? '<div class="inner__info">' + species + '</div>' : ''}
${actors ? '<div class="inner__info">' + actors + '</div>' : ''}
${movies ? '<div class="inner__info">' + movies.join(', \n') + '</div>' : ''}
        </div>
        
        </div>
    </div>
        
        `;




        return actor;


    };
    const showCards = (key, value) => {

        let fragment = document.createDocumentFragment();
        wraper.innerHTML = '';
        if (key && value) {

            data.forEach((hero) => {
                if (hero[key] === value) {
                    fragment.appendChild(createCardSet(hero));
                }
            });

        } else {
            data.forEach((hero) => {
                fragment.appendChild(createCardSet(hero));
            });
        }

        wraper.appendChild(fragment);

    };

    //Запрос данных с сервера
    const askDataFromServer = () => {
        let request = new XMLHttpRequest();
        request.open('GET', './dbHeroes.json');
        request.send();
        request.addEventListener('load', () => {

            if (request.status === 200) {
                data = JSON.parse(request.response);
                showCards();
            }


        });

    };
    askDataFromServer();

    //Меню

    const menu = () => {

        const menuBar = document.getElementById('menu__bar');

        menuBar.addEventListener('mouseleave', (e) => {
            menuBar.querySelector('input').checked = false;
        });

        menuBar.addEventListener('click', (e) => {

            let target = e.target,
                value = target.textContent,
                key = target.dataset.key;

            if (target.closest('.menu')) {

                reachTo(target.closest(('#menu__bar')).offsetTop);
                key === 'all' ? showCards() : showCards(key, value);
            }


        });

        const reachTo = (position) => {
                let curentposition = document.documentElement.scrollTop,
                    difference = position - curentposition,
                    stopAnimation,
                    counter = difference / 2;

                const slide = () => {
                    if (counter >= difference) {
                        cancelAnimationFrame(stopAnimation)
                        counter = difference;
                        return;
                    }

                    document.documentElement.scrollTop = curentposition + counter;

                    counter += parseInt((difference - counter) / 7 + 1);
                    stopAnimation = requestAnimationFrame(slide);


                }

                slide();






            }

    };

    menu();


});





