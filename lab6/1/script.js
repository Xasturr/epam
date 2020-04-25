$(document).ready(function () {
    $(".myBtn").click(function () {
        let str = $(".inputName").val();
        let err = false;
        if (str.length === 0) {
            $(".spanWarningName").text("Empty input");
            event.preventDefault();
            err = true;
        }
        else
            $(".spanWarningName").text("");

        str = $(".inputEmail").val();
        if (str.length === 0) {
            $(".spanWarningEmail").text("Empty input");
            event.preventDefault();
            err = true;
        }
        else
            $(".spanWarningEmail").text("");

        str = $(".inputMessage").val();
        if (str.length === 0) {
            $(".spanWarningMessage").text("Empty input");
            event.preventDefault();
            err = true;
        }
        else
            $(".spanWarningMessage").text("");

        if (!err) {
            $.post("https://www.tutorialsteacher.com/jquery/jquery-post-method/jquery/submitData",  // url
                {   name: $(".inputName").val(),
                    email: $(".inputEmail").val(), 
                    message: $(".inputMessage").val()}, // data to be submit
                function (data, status, xhr) {   // success callback function
                    alert('status: ' + status + ', data: ' + data.responseData);
                },
                'json'); // response data format
        }
    });
})


// let url = 'https://randomuser.me/api/?results=50';
// let picture = document.getElementsByClassName("picture")[0];

// function getHttp(url) {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);

//         xhr.onload = function () {
//             if (this.status == 200) {
//                 resolve(JSON.parse(this.response));
//             } else {
//                 let err = new Error(this.statusText);
//                 err.code = this.status;
//                 reject(err);
//             }
//         }

//         xhr.onerror = function () {
//             reject(new Error("Network error"));
//         };

//         xhr.send();
//     });
// }

// getHttp(url)
//     .then(res => {
//         res.results.forEach(element => {
//             let img = document.createElement('img');
//             img.src = element.picture.large;
//             img.class = 'img';
//             img.alt = 'image';
//             img.style = 'margin: auto; margin-bottom: 80px';
//             picture.appendChild(img);
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });

// function OnMouseMove(event) {
//     let posX = event.clientX, posY = event.clientY;
//     console.log(posX, posY);
// }