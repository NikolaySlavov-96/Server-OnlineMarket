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
   - check field whether it is busy or not GET --> /auth/check?email={email}  -> return true or false
   - check field whether it is busy or not GET --> /auth/check?telephone={tel} -> return true or false

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

   - get All products GET --> /product/products
   - get product for detail page GET --> /product/category/:idSource/comments

   - get one productus only edit GET --> /product/:category/:idSource
      - first category --> technology

   - create new product --> /product/category
    {
      "coverImg": "", // adding in imgs 
      "productName": "",
      "category": "",
      "subCategory": "",
      "imgs": ["", ""],
      "description": "",
      "sizes": "",
      "release": ""
    }
   - edit product PUT --> /product/:category/:idSource
    {
      "coverImg": "",
      "productName": "",
      "category": "",
      "subCategory": "",
      "imgs": ["", ""],
      "description": "",
      "sizes": "",
      "release": ""
    }
   - delete product DELETE --> /product/category/:idSource

4. Commentar Endpoint

   - get one commentar GET --> /product/category/:idSource/comment/:idComment
   - create new commentar POST --> /product/:idSource/comment
    {
    name,
    commentar,
    }

   - edit commentar PUT --> /product/category/:idSource/comment/:idComment
    {
    name,
    commentar
    }
   - delete commentar DELETE --> /product/category/:idSource/comment/:idComment

5. Search Endpoint

   - get search date GET --> /search?where

6. Calls with Customer
   - get all calls with customer GET --> /call/user/:userId?sortBy=callDate&limit={quant}
   - post calls for customer talks POST --> /call/user/:userId
   {
      idType
      type
      description
   }
   - edit calls for customer talks PUT --> /call/user/:userId?callsId={callsId}
   {
      idType
      type
      description
   }
   - get all Messages for theme talks GET --> /call/messages

## Front End endpoints

1. activation account --> adding in register Email form

- <https://www.shop-hop.store/activate>;
- <https://www.shop-hop.store/activate?${userId}&${activateCode}>;
