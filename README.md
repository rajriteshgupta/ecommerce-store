# E-commerce Admin

An e-commerce store application to provide functionality to add products to cart and place orders. This application is capable of managing favourites and filtering products with multiple filters.

## Features

- Light/dark/system mode option
- Product to favourite/cart
- Compatible for desktop as well as mobile screen
- Easy to use interface
- Sign in/Sign up with Google

## Screenshots

![ecommerce-store](https://github.com/rajriteshgupta/ecommerce-store/assets/37078846/1cce35a3-f50e-436f-9192-8b87159c6226)


## Tech Stack

**Client:** React, Redux, Tailwind CSS

**Server:** Node, Next.js

**Authentication:** Clerk

**Payment gateway:** Stripe

## Demo

For demo, please use this [Link](https://ritesh-ecommerce-store.vercel.app/).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

`NEXT_PUBLIC_BILLBOARD_ID`

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

`CLERK_SECRET_KEY`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`


## Run Locally

Clone the project

```bash
  git clone https://github.com/rajriteshgupta/ecommerce-store.git
```

Go to the project directory

```bash
  cd ecommerce-store
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Appendix

To run this project, please setup [E-commerce Admin](https://github.com/rajriteshgupta/ecommerce-admin) first.
