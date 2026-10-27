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
    type Post{
        id:String
        title:String
        description:String
        author:User
        created_at:String
    }

    type Query{
        auth:User
        post(id:String):Post
    }
`;
