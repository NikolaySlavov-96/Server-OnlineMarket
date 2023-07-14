# host = <https://slavo-v.top:4999>

## Back End endpoints

1. Authorization Endpoint

   - register POST --> /auth/register
    {
    "email": "required",
    "imgUrl": "/statcil/profile1",
    "password": "required",
    "rePassword": "required",
    "circulation": "required",
    "telephone": "required",
    "birthday": "required", format(22/22/2222),
    "firstName": "required",
    "middleName": "notRequired",
    "lastName": "required"
    }
   - login POST --> /auth//login
    {
    "email": "",
    "password": "",
    stayLogin --> check square
    }
   - Logging out POST --> /auth/logout
    {
    accessToken
    }
   - activation account POST --> /auth/activation?userId={userId}&activateCode={activateCode}
   - check field whether it is busy or not GET --> /auth/check?email={email}  -> return true or false
   - check field whether it is busy or not GET --> /auth/check?telephone={tel} -> return true or false
   - reset Password POST --> /auth/reset
      {
         "email": "",
         "telephone": ""
      }
   -create new password POST --> /auth/createpassword
      {
         "resetCode": "",
         "newPassword": "",
         "repeatNewPassword": ""
      }

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

   - get All products GET --> /product/categories?
   category={} / subCategory={} / release={} / page= and limit=
   - get one product GET --> /product/:category/:idSource --> detail page
      - categorys
         - electronics
         - babys
         - fashion
         - office

   - create new product --> /product/category
    {
      "productCode": Number,
      "coverImg": "", // adding in imgs
      "mark": "",
      "productName": "",
      "category": "",
      "subCategory": "",
      "imgs": ["", ""],
      "description": "",
      "manufacture": "",
      "release": "",
      "buyPrice": Number,
      "quantity": Number,
      "colors": "", ? optional relative to the category
      "sizes": "", ? optional relative to the category
      "material": ", ? optional relative to the category
    }
   - edit product PUT --> /product/:category/:idSource
    {
      "productCode": Number,
      "coverImg": "", // adding in imgs
      "mark": "",
      "productName": "",
      "category": "",
      "subCategory": "",
      "imgs": ["", ""],
      "description": "",
      "manufacture": "",
      "sizes": "", ?
      "colors": "", ?
      "release": "",
      "buyPrice": "",
      "quantity": NumberproductCode
    }
   - delete product DELETE --> /product/category/:idSource

4. Commentar Endpoint

   - get commentars for detail page page GET --> /product/category/:idSource/comments?page= and limit=

   - get one commentar GET --> /product/category/:idSource/comment/:idComment
   - create new commentar POST --> /product/category/:idSource/comment
    {
    "name": "",
    "commentar": "",
    }

   - edit commentar PUT --> /product/category/:idSource/comment/:idComment
    {
    name,
    commentar
    }
   - delete commentar DELETE --> /product/category/:idSource/comment/:idComment

5. Search Endpoint

   - get search date GET --> /search?where=search={searchName} and search by productCode productName category subCategory release

6. Calls with Customer
   - get all calls with customer GET --> /call/user/:userId?sortBy=callDate&limit={quant}
   - post calls for customer talks POST --> /call/user/:userId
   {
      idType
      extDescription --> optional at code 999
   }
   - edit calls for customer talks PUT --> /call/user/:userId?callsId={callsId}
   {
      idType
      extDescription --> optional at code 999
   }
   - get all Messages for theme talks GET --> /call/messages

7. Blacklist
   - get all blacklists GET --> /blacklist
   - get personal blacklist GET --> /blacklist/:userId
   - add person to blacklist POST--> /blacklist
      {
         "userId": ":userId",
         "commentId": ":commentId",
         "description": "Example message",
         "type": "010" //see typeCodes inside blacklistController
      }
   - remove person from blacklist DELETE --> /blacklist/:userId
   - get all typeCodes GET --> /blaclist/codes

8. reward
   - get using reward code GET --> /reward/code?promocode={promocode} --> return true or false
   - create partner code GET --> /reward/adding?partnercode={partnercode}&purcendDiscount={} --> return code

9. Controll
   - get all comments for from and to date GET --> /control/allCommentars?from={}&to={}isDelete={boolean}

## Front End endpoints

1. activation account --> adding in register Email form

- <https://www.shop-hop.store/activate>;
- <https://www.shop-hop.store/activate?${userId}&${activateCode}>;
