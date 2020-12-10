let list = document.querySelector('.listPlayersTemplate');
var template = Handlebars.compile(list.innerText)

const display = document.querySelector('.list');

let textBoxElem = document.querySelector('.nameEntered');
let radioBtnElem = document.querySelector('.radioBtn');

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


axios.get('/api/users').then(result => {
    console.log(result.data)

    display.innerHTML = template({users: result.data})


}).catch(err => console.log(err))

const u = {
    name: 'Thabang', signname: 3, friends: []
  }



  
function addData() {

axios.post('api/players', u).then(result => {
    console.log(result.data)
}).catch(err => console.log(err))

}

const players =  [
    {
           playername: 'Thabang', signname: "central" , tm_model_tag: 2 , player_score: 3
    }, {
          playername: 'Jane', signname: "fourways", tm_model_tag: 3, player_score: 3
    },{
          playername: 'Thabiso', signname: "midrand", tm_model_tag: 1, player_score: 2
    },{
       playername: 'Sipho', signname: "central", tm_model_tag: 2, player_score: 1
    },

  ]


  axios.get('/api/players').then(result => {
    console.log(result.data)

    display.innerHTML = template({players: result.data})


}).catch(err => console.log(err))

  function addPlayer() {

    axios.post('api/users', players).then(result => {
        console.log(result.data)
    }).catch(err => console.log(err))
    
    }


 function addFromTextBox() {
    var nameValue = textBoxElem.value;
    function addPlayer() {

        axios.post('api/users' + nameValue , players).then(result => {
            console.log(result.data)
        }).catch(err => console.log(err))
        
        }

 };

 function addFromRadio() {

    var radioValue = radioBtnElem.value;


};
