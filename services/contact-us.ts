 "use server";

 import mongoose from "mongoose";

 // MongoDB connection
 const MONGODB_URI = process.env.MONGODB_URI;

 // Define your schema
 const ContactMessageSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String },
   subject: { type: String, required: true },
   message: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
 });

 // Get model (prevents creating multiple models with same name)
 let ContactMessage: mongoose.Model<any>;
 try {
   // Use existing model if it exists
   ContactMessage = mongoose.model("ContactMessage");
 } catch {
   // Create new model if it doesn't exist
   ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);
 }

 // Connect to MongoDB function
 async function connectToMongo() {
   if (!MONGODB_URI) {
     throw new Error("MongoDB URI is not defined in environment variables");
   }

   if (mongoose.connection.readyState >= 1) {
     return; // Already connected
   }

   try {
     await mongoose.connect(MONGODB_URI);
     console.log("Connected to MongoDB");
   } catch (error) {
     console.error("MongoDB connection error:", error);
     throw new Error("Failed to connect to MongoDB");
   }
 }

 export interface ContactFormData {
   name: string;
   email: string;
   phone?: string;
   subject: string;
   message: string;
 }

 export async function submitContactForm(data: ContactFormData) {
   try {
     // Connect to MongoDB
     await connectToMongo();

     // Create and save new contact message
     const newMessage = new ContactMessage({
       name: data.name,
       email: data.email,
       phone: data.phone || "",
       subject: data.subject,
       message: data.message,
     });

     const savedMessage = await newMessage.save();

     return {
       success: true,
       id: savedMessage._id.toString(),
       message: "Your message has been sent successfully!",
     };
   } catch (error) {
     console.error("Error submitting form:", error);
     return {
       success: false,
       message: "There was an error sending your message. Please try again.",
     };
   }
 }