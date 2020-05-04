const Country = require('../models/country');
const City = require('../models/city');

const getCountries = async () => {
  try {
    const countries = await Country.find({});
    return countries;
  } catch (error) {
    throw error;
  }
};

const getCities = async (countryId) => {
  try {
    const cities = await City.find({ countryId })
    return cities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getCountries,
    getCities
};
