// Getting a menu list of items looking like:
// {
//     "id": 1,
//     "name": "Chips & Guacamole",
//     "image": "./assets/calexico-guac.webp",
//     "description":"House-made tortilla chips with fresh daily made guacamole",
//     "price": 13.00,
//     "number_in_bag": 0
// }

const menuList = document.getElementById('menu-items')
const image = document.getElementById('dish-image')
const name = document.getElementById('dish-name')
const description = document.getElementById('dish-description')
const price = document.getElementById('dish-price')
const cartNumber = document.getElementById('number-in-cart')
const amount = document.getElementById('cart-amount')
const formSubmit = document.getElementById('cart-form')
formSubmit.addEventListener('submit', (event) => addToCart(event))

let currentItemID = 0

const fetchMenu = () => {
	fetch('http://localhost:3000/menu')
		.then((res) => res.json())
		.then((menu) => {
			getMenuItems(menu)
			dish(menu[0])
		})
}

const getMenuItems = (menu) => {
	menu.forEach((item) => {
		const span = document.createElement('span')
		span.setAttribute('id', item.id)
		span.addEventListener('click', () => dish(item))
		span.textContent = item.name
		menuList.appendChild(span)
	})
}

const dish = (menu) => {
	currentItemID = menu.id
    console.log(currentItemID)
	image.setAttribute('src', menu.image)
	name.textContent = menu.name
	description.textContent = menu.description
	price.textContent = menu.price
	cartNumber.textContent = menu.number_in_bag
}

const addToCart = (event) => {
	event.preventDefault()
	cartNumber.innerText =
		parseInt(cartNumber.innerText) + parseInt(event.target[0].value)
	// console.log(name.textContent)
	fetch(`http://localhost:3000/menu/${currentItemID}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			number_in_bag: cartNumber.innerText
		})
	})
		.then((res) => res.json())
		.then((menu) => {
            dish(menu[currentItemID])
		})
}

fetchMenu()
