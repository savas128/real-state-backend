const ObjectId = require("mongoose").Types.ObjectId;

class QueryBuilder {
  constructor() {
    this.query = {};
    this.pageSize = 12;
    this.page = 1;
    this.sortBy = { createdOn: -1 };
  }

  byCity = (cityId) => {
    if (cityId) {
      this.query["cityId"] = ObjectId(cityId);
    }
    return this;
  };

  byPrice = (price) => {
    const priceQuery = {};
    if (price) {
      const { min, max } = price;
      if (min) {
        priceQuery["$gte"] = (min);
      }
      if (max) {
        priceQuery["$lte"] = (max);
      }
    }
    if (Object.keys(priceQuery).length > 0) {
      this.query["price"] = priceQuery;
    }
		return this;
  };

  byNumberOfRooms = (rooms) => {
    const roomsQuery = {};
    if (rooms) {
      const { min, max } = rooms;
      if (min) {
        roomsQuery["$gte"] = parseInt(min);
      }
      if (max) {
        roomsQuery["$lte"] = parseInt(max);
      }
    }
    if (Object.keys(roomsQuery).length > 0) {
      this.query["rooms"] = roomsQuery;
		}
		return this;
  };

  byType = (type) => {
    if (type) {
      this.query["propertyType"] = type;
    }
    return this;
  };

  byPurpose	 = (purpose) => {
    if (purpose) {
      this.query["propertyPurpose"] = purpose;
    }
    return this;
  };

  sort = (sortBy) => {
    let filter;
    switch (sortBy) {
      case "old":
        filter = { createdOn: 1 };
      case "price-high-to-low":
        filter = { price: -1 };
      case "price-low-to-high":
        filter = { price: 1 };
      default:
        filter = { _id: -1 };
    }
    this.sortBy = filter;
    return this;
  };

  availableOnly = () => {
    this.query["available"] = true;
    return this;
  };

  approvedOnly = () => {
    this.query["status.label"] = "approved";
    return this;
  };

  size = (pageSize) => {
    if (pageSize) {
      this.pageSize = parseInt(pageSize);
    }
    return this;
	};
	
	getPage = (page) => {
		if (page) {
			this.page = page;
		}
		return this;
	}

  build = () => {
    return {
      query: this.query,
      sortBy: this.sortBy,
			skip: this.pageSize * (this.page - 1),
			pageSize: this.pageSize
    };
  };
}

module.exports = QueryBuilder;
