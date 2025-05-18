import mongoose, { Connection, Model, Document } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

// Define an interface for the cached mongoose connection
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the NodeJS Global type to include mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Connection cache
let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false, // Disable buffering if you want to handle connection errors immediately
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    const mongooseInstance = await cached.promise;
    if (mongooseInstance) {
      cached.conn = mongooseInstance.connection;
      return cached.conn;
    }
    throw new Error("Mongoose instance is null after connection attempt.");
  } catch (e) {
    // If the promise was rejected, reset it so we can try again
    cached.promise = null;
    throw e;
  }
}

// Define an interface for your ContactMessage document
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Define Contact Message Schema
const ContactMessageSchema = new mongoose.Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create model (only if it doesn't already exist)
// Use Model<IContactMessage> for strong typing
export const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
