export const schema = `#graphql
    input InputUser{
        id:String,
        email:String,
        firstname:String,
        lastname:String
    }

    type User{
        id:String,
        email:String,
        firstname:String,
        lastname:String
    }
    type Mutation{
        updateUser(data:InputUser!):User
    }
    type Query{
        auth:User
    }
`;
