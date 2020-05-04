const QueryBuilder = require("./query-builder");
const Apartment = require("../models/apartment");

const getAmoutOfPagesPerQuery = async (query, pageSize) => {
  const totalFound = await Apartment.countDocuments(query);
  return totalFound === 0 ? 0 : Math.ceil(totalFound / pageSize);
};

const getApartments = async (req) => {
  try {
    const { query, skip, pageSize, sortBy } = new QueryBuilder()
      .byCity(req.cityId)
      .byPrice(req.price)
      .byNumberOfRooms(req.rooms)
      .byType(req.propertyType)
      .byPurpose(req.propertyPurpose)
      .size(req.pageSize)
      .getPage(req.page)
      .availableOnly()
      .approvedOnly()
      .build();
    const apartments = await Apartment.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(pageSize);
    const pages = await getAmoutOfPagesPerQuery(query, pageSize);
    return { apartments, pages };
  } catch (error) {
    throw error;
  }
};

const getApartmentById = async (id) => {
  try {
    const apartment = await Apartment.findOne({ _id: id }).select({
      status: false,
    });
    return apartment;
  } catch (error) {
    throw error;
  }
};

const getApartmentsByUser = async (userId) => {
  try {
    const apartments = await Apartment.find({ userId });
    return apartments;
  } catch (error) {
    throw error;
  }
};

const addApartment = async ({
  userId,
  address,
  cityId,
  price,
  numberOfRooms,
  numberOfBaths,
  sqft,
  description: desc,
  available,
  propertyPurpose,
  propertyType,
  images,
}) => {
  const apartment = {
    userId,
    address,
    cityId,
    price,
    numberOfRooms,
    numberOfBaths,
    sqft,
    desc,
    available,
    propertyPurpose,
    propertyType,
    images,
  };

  const apartments = (await connection)
    .db("realtor-mongo")
    .collection("apartments");
  const result = await apartments.insertOne(apartment);
  return result;
};

updateApartment = async (id, fields) => {
  const collection = (await connection)
    .db("realtor-mongo")
    .collection("apartments");
  const result = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { ...fields } }
  );
  return result;
};

module.exports = {
  getApartments,
  addApartment,
  getApartmentById,
};
