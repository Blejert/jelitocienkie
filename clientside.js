document.getElementById("send").addEventListener("click", event => {
  const message = document.getElementById("textinput").value;
  const rating = document.getElementById("slider").value;

  if (message.trim() === '') {
    console.error('Message is required');
    return;
  }
  console.log(message);
  console.log(rating);

  fetch('http://blejertmysql.ddns.net:3000/rate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message, rating: rating })
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(`Rating sent`);
    })
    .catch(error => {
      console.error('Error sending rating:', error);
    });
});

fetch('http://blejertmysql.ddns.net:3000/getratings')
.then(response => response.json())
.then(ratings => {
  ratings.forEach(rating => {
    const ratingContainer = document.createElement('div');
    const idElement = document.createElement('p');
    const messageElement = document.createElement('p');
    const ratingValueElement = document.createElement('p');
    idElement.textContent = `ID: ${rating.id}`;
    messageElement.textContent = `Message: ${rating.message}`;
    ratingValueElement.textContent = `Rating: ${rating.rating}`;
    ratingContainer.appendChild(idElement);
    ratingContainer.appendChild(messageElement);
    ratingContainer.appendChild(ratingValueElement);
    document.body.appendChild(ratingContainer);
  });
})
.catch(error => {
  console.error(error);
});
