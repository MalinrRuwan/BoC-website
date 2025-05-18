"use server";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";


export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    if (!db) {
      throw new Error("Firebase database is not initialized");
    }

    const docRef = await addDoc(collection(db, "contactMessages"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
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

