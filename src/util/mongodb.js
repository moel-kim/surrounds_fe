import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside config.js",
	);
}

if (!MONGODB_DB) {
	throw new Error(
		"Please define the MONGODB_DB environment variable inside config.js",
	);
}

const connectDB = (handler) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		// Use current db connection
		return handler(req, res);
	}
	// Use new db connection
	await mongoose.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useNewUrlParser: true,
		dbName: "surrounds",
	});
	return handler(req, res);
};

export default connectDB;
