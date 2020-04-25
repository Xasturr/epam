let url = 'https://randomuser.me/api/?results=50';
let picture = document.getElementsByClassName("picture")[0];

function getHttp(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(JSON.parse(this.response));
            } else {
                let err = new Error(this.statusText);
                err.code = this.status;
                reject(err);
            }
        }

        xhr.onerror = function () {
            reject(new Error("Network error"));
        };

        xhr.send();
    });
}

getHttp(url)
    .then(res => {
        res.results.forEach(element => {
            let img = document.createElement('img');
            img.src = element.picture.large;
            img.class = 'img';
            img.alt = 'image';
            img.style = 'margin: auto; margin-bottom: 80px';
            picture.appendChild(img);
        });
    })
    .catch(err => {
        console.log(err);
    });

function OnMouseMove(event) {
    let posX = event.clientX, posY = event.clientY;
    console.log(posX, posY);
}