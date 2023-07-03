# host = <https://slavo-v.top:4999>

## Back End endpoints

1. Authorization Endpoint

   - register POST --> /auth/register
    {
    email: required,
    imgUrl: notRequred,
    password: required,
    telephone: required,
    birthday: required, format(22/22/2222),
    firstName: required,
    middleName: notRequired,
    lastName: required,
    }
   - login POST --> /auth//login
    {
    email,
    password,
    }
   - Logging out POST --> /auth/logout
    {
    accessToken
    }
   - activation account POST --> /auth/activation?userId={userId}&activateCode={activateCode}

2. Userprofil Endpoint
    - get user data GET --> /users/profile
    - edit user date PUT --> /users/profile/
    {
        imgUrl;
        password;
        birthday;
        firstName;
        middleName;
        lastName;
    }
    - delete user DELETE --> /users/profile/

3. Product Endpoint

   - get All products GET --> /source/products
   - get product for detail page GET --> /product/:idSource/comments

   - get one productus only edit GET --> /source/product/:idSource

   - create new product --> /source/product
    {
    // To Do
    }
   - edit product PUT --> /source/product/:idSource
    {
    // To Do
    }
   - delete product DELETE --> /source/product/:idSource

4. Commentar Endpoint

   - get one commentar GET --> /product/:idSource/comment/:idComment
   - create new commentar POST --> /product/:idSource/comment
    {
    name,
    commentar,
    }

   - edit commentar PUT --> /product/:idSource/comment/:idComment
    {
    name,
    commentar
    }
   - delete commentar DELETE --> /product/:idSource/comment/:idComment

5. Search Endpoint

- get search date GET --> /search?where

## Front End endpoints

1. activation account --> adding in register Email form

- <https://www.shop-hop.store/activate>;
- <https://www.shop-hop.store/activate?${userId}&${activateCode}>;
