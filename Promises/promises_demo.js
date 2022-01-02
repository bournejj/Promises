let favnumber = 4;
let baseurl = 'http://numbersapi.com';

async function part1() {
    let data = await $.getJSON(`${baseurl}/${favnumber}?json`);
    console.log(data)
}

part1();

let numbers = [1, 4, 7, 10]



async function part2() {
    let data = await $.getJSON(`${baseurl}/${numbers}?json`);
    console.log(data)
}

part2();

async function part3() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseurl}/${favnumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
part3();



async function draw_deck() {
    let draw_deck = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    let data = await $.getJSON(`${draw_deck}`);
    let deck_id = data.deck_id;
    console.log(data)





}

draw_deck();

async function value_and_suit() {
    let new_deck = 'http://deckofcardsapi.com/api/deck/new/draw/?count=1';
    let data = await $.getJSON(`${new_deck}`);
    suit = data.cards[0].suit
    value = data.cards[0].value
    console.log(suit, value)





}

value_and_suit();

async function two_cards() {
    let new_deck = 'http://deckofcardsapi.com/api/deck/new/draw/?count=1';
    let data = await $.getJSON(`${new_deck}`);
    let deck_id = data.deck_id

    let draw_card = await $.getJSON(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    [new_deck, draw_card].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });





}

two_cards();

async function part2() {

    let baseURL = 'https://deckofcardsapi.com/api/deck';

    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
}

part2();


async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function () {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (cardData.remaining === 0) $btn.remove();
    });
}
setup();










// async function get_card() {

//     draw_deck();



//     let base_url = 'http://deckofcardsapi.com/api/deck'

//     let card = 'http://deckofcardsapi.com/api/deck/`${deck_id}`/draw/?count=1';
//     let data = await $.getJSON(`${base_url}/${card}/draw/?count=1`);

//     console.log(data)

// }

// get_card();



