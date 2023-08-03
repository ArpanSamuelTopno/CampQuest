const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64b6a3221da723e5ee03c429',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, beatae. Corrupti quisquam similique non quod expedita animi, error nisi maiores. Nemo ea cum alias corrupti aperiam, voluptas quis quidem autem.',
            price,
            geometry: {
                type: "Point", 
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude, ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dnpxqueer/image/upload/v1690109520/YelpCamp/gprbljwicblftcuxooyh.jpg',
                  filename: 'YelpCamp/gprbljwicblftcuxooyh',
                },
                {
                  url: 'https://res.cloudinary.com/dnpxqueer/image/upload/v1690109520/YelpCamp/kpq2kn6wrooqtbfslvat.jpg',
                  filename: 'YelpCamp/kpq2kn6wrooqtbfslvat',
                },
                {
                  url: 'https://res.cloudinary.com/dnpxqueer/image/upload/v1690109520/YelpCamp/n8rpgrjdmlvaliauqhja.jpg',
                  filename: 'YelpCamp/n8rpgrjdmlvaliauqhja',
                }
              ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})