fetch('https://oyster-app-e3wt6.ondigitalocean.app/ck')
	.then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then((data) => {
		data.map((feeling) => {
			const feelingDiv = document.createElement('div');
			feelingDiv.classList.add('feelingGroup');
			document.body.appendChild(feelingDiv);

			const feelingName = document.createElement('h1');
			feelingName.textContent = feeling.name;
			feelingDiv.appendChild(feelingName);
			feelingName.classList.add('feelingName');

			const feelingUser = document.createElement('h3');
			feelingUser.textContent = feeling.user;
			feelingDiv.appendChild(feelingUser);
			feelingUser.classList.add('feelingUser');

			if (feeling.with) {
				const feelingWith = document.createElement('h3');
				feelingWith.textContent = `${feeling.with} ile birlikte`;
				feelingDiv.appendChild(feelingWith);
				feelingWith.classList.add('feelingWith');
			}

			if (feeling.place) {
				const feelingPlace = document.createElement('h3');
				feelingPlace.textContent = `${feeling.place} yerinde`;
				feelingDiv.appendChild(feelingPlace);
				feelingPlace.classList.add('feelingPlace');
			}

			if (feeling.hoursOfSleep) {
				const hoursOfSleep = document.createElement('h3');
				hoursOfSleep.textContent = `${feeling.hoursOfSleep} saatlik uyku`;
				feelingDiv.appendChild(hoursOfSleep);
				hoursOfSleep.classList.add('hoursOfSleep');
			}

			if (feeling.additional) {
				const additional = document.createElement('h4');
				additional.textContent = `${feeling.additional}`
				feelingDiv.appendChild(additional);
				additional.classList.add('additional');
			}
		});
	})
	.catch((error) => {
		console.error('There was a problem fetching the data:', error);
	});

const form = document.querySelector('#feelingForm');
form.addEventListener('submit', (event) => {
	// event.preventDefault();

	const name = document.querySelector('#name').value;
	const user = document.querySelector('#user').value;
	const place = document.querySelector('#place').value;
	const together = document.querySelector('#with').value;
	const additional = document.querySelector('#additional').value;


	const body = {
		user: user,
		name: name,
		place: place,
		with: together,
		additional: additional
	};

	console.log(body);

	fetch('https://oyster-app-e3wt6.ondigitalocean.app/beng', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error(error));
});
