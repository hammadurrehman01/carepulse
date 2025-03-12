"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  storage,
  users,
  PATIENT_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
  
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log("documents ==>", documents);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentURL: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      }
    );

    return parseStringify(newPatient);
  } catch (error: any) {
    console.log(error.message);
  }
};
