import pkg from "pg";
const { Client } =  pkg;

const client = new Client({
  user: "postgres",
  password: "prajwal478",
  host: "localhost",
  post: 5432,
  database: "project_management",
});

export const connectdb = async() => {
    try{ 
        client.connect();
        console.log("Db Connected ")
    }catch(error){
        console.error(error);

    }
} 

export default client;
