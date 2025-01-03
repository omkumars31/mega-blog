import conf from "../conf/conf";
import { Client, ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, Status, UserID}){
      try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content, 
                featuredImage,
                Status,
                UserID
            }
        )
      } catch (error) {
        console.log("Appwrite Service :: createPost :: error", error);

      }  

    }

    async updatePost(slug,{title, slug, content, featuredImage, Status}){
        try {
          return await this.databases.updateDocument(
              conf.appwriteDatabaseID,
              conf.appwriteCollectionID,
              slug,
              {
                  title,
                  content, 
                  featuredImage,
                  Status,
                  UserID
              }
          )
        } catch (error) {
          console.log("Appwrite Service :: createPost :: error", error);
  
        }  
  
      }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Serive :: deletePost :: error", error);

        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Serive :: getPost :: error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Serive :: getPosts :: error", error);
            return false;
        }
    }

    //File Upload Service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Serive :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Serive :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }
}

const service = new Service()
export default service