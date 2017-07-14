const db = require('../index.js');
const Sequelize = require('sequelize');
const images = [
  'http://cdn.images.express.co.uk/img/dynamic/151/590x/Earth-spin-742026.jpg',
  'https://i.ytimg.com/vi/KGk4b2bBIp4/maxresdefault.jpg',
  'http://www.space.news/wp-content/uploads/sites/38/2015/12/cloud.jpg',
  'http://www.scifiideas.com/wp-content/uploads/2012/02/planet_Aegir.jpg',
  'https://cdn.drawception.com/images/panels/2015/8-6/Cabj8q7CMG-6.png',
  'http://static3.businessinsider.com/image/59669e3d0976db34008b4ce3/nasas-1-billion-jupiter-probe-just-sent-back-breathtaking-new-images-of-the-great-red-spot.jpg'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: function(){
      return getRandomImage();
    }
  }
});

module.exports = Campus;
