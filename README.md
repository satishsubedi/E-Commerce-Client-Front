

# Testing to check cloning : Kovid

# Testing to check cloning : Kovid

# React Fullstack E-Commerce (Client Front-End)

Welcome to (MERN) React Fullstack E-Commerce App (Client Front-end). This project showcases how the users can see products and can place order. Front End of this website uses React libraries. This website gives user friendly interface for users.

## Table of Contents

- [Introduction](#introduction)
- [Features](#Features)
- [Technologies Used](#Technologies-Used)
- [How to use](#How-to-use)
- [Project Structure](#project-Structure)
- [Contributing](#Contributing)
- [License](#License)
- [Contact](#contact)
- [Thank you Message](#Thank-you-Message)

## Introduction

This (MERN) Fullstack Books Management System shows the users can easily buy roducts. They can create their account by submitting first name, last name, email, phone number and password and profile picture. After signup, they can activate account from activation link that comes in valid email account. After that users can log in by email and password. If users forget password they can reset password by providing email and will recieve OTP. After submitting OTP and new password can make new password. When they logged in, they will see shopping homepage. In homepage there will be different categories. Users can select product whatevery they like and can add in cart. There will be cart page and users can adjust cart itms like increase quantities, remove items, clear items etc. There will be account page where users can update their account. They can proceed to payment where can choose payment system such as card, paypal etc. After payment is success will be redirect to the order status and order history page.

## Features

- **User-friendly Interface and Responsive Design**: Optimized for all devices, including desktops, tablets, and mobile phones.
- **Multile Page App**: This website is build using multiple page app structure. The codebase for the multiple page is deployed in github and the code is available `main` branch.

- **Review Features**:

  - Users can lease review and rate after placing the order.
  - Rating will be on a 1-5 star scale

- **Reports and History**:
  - Users can see past order history.

## Technologies Used

- ReactJS: A popular open-source JavaScript library primarily used for building dynamic and interactive user interfaces (UI) for web applications
- Yarn: Allows developers to easily install, manage, and update external code libraries (packages) needed for their applications.
- Vite: A fast and efficient frontend build tool.
- Java Script: Very popular programming language.
- Redux: A JavaScript library primarily used for managing an application's state in a centralized manner.
- React Icons: It provides icones which are used while building React web application.
- React router dom: An npm package that enables you to implement dynamic routing in a web app.
- Axios: A popular JavaScript library that allows developers to make HTTP requests (like GET, POST, PUT, DELETE) to web servers.
- regex: A sequence of characters that defines a pattern used to search and match text strings.
- React Toastify: It shows the pop up messages.
- Tailwind: Tailwind is unapologetically modern, and takes advantage of all the latest and greatest CSS features to make the developer experience as enjoyable as possible.
- Shad/cn:A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.

## How to use

To set of this project in your device locally, please follow the steps:

1. **Clone the repository**:
   Run the following command in your terminal

```
git clone https://github.com/budhathokidinesh/E-Commerce-Client-Front.git
or
git clone git@github.com:budhathokidinesh/E-Commerce-Client-Front.git
```

2. **Navigate to the project repository**:
   Run the following command in your terminal

```
cd client-front
```

3. **Install the Dependencies**:

```
yarn add redux axios react-router-dom react-toastify react-icons react-redux @reduxjs/toolkit regex

To install tailwind and shad/cn please follow documentation
```

4. **Run the development server**:

```
yarn
yarn dev
```

Note: If you are not using `yarn`, you must install it globally. To install `yarn` globally, run the following command `npm i yarn -g`

## Project Structure

```
FE_BMS
|-- public
|-- src
| |--assets
| | |--customInputs
| | | |--
| | | |--
| | |--components
| | | |--auth
| | | | |--
| | | |--forms
| | | | |--
| | | | | |--
| | | | | |--
| | | |--layouts
| | | | |--DefaultLayouts.jsx
| | | | |--Footer.jsx
| | | | |--Header.jsx
| | | | |--Sidebar.jsx
| | | | |--UserLayouts.jsx
| | | |--tables
| | | | |--BookTable.jsx
| | |--features
| | | |--user
| | | | |--userAction.js
| | | | |--userApi.js
| | | | |--userSlice.js
| | | |--book
| | | | |--bookAction.js
| | | | |--bookApi.js
| | | | |--bookSlice.js
| | |--hooks
| | | |--userForm.js
| | |--pages
| | | |--auth
| | | | |--ActivateUserPage.jsx
| | | | |--ForgotPasswordPage.jsx
| | | | |--SignInPage.jsx
| | | | |--SignUpPage.jsx
| | | |--shopping
| | | | |--
| | | | |--
| | | | |--
| | | | |--
| | | | |--
| | | |--dashboard
| | | | |--DashboardPage.jsx
| | | |--home
| | | | |--HomePage.jsx
| | | |--reviews
| | | | |--ReviewsPage.jsx
| | | |--user
| | | | |--ProfilePage.jsx
| | | | |--UserPage.jsx
| | | |--index.js
| | |--redux
| | | |--store.js
| | |--routes
| | | |--AppRoutes.jsx
| | |--services
| | | |--api.js
| | | |--authAPI.js
| | |--utils
| | | |--validatePassword.js
```

## Contributing

- Dinesh Budhathoki
- Mahesh
- Shekhar
- Satish
- Kovid

## License

This project is licensed under the MIT License. See the [LICENSE] (https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) file for more details.

## Contact

If you have any questions or want to get in touch, feel free to reach out:

- Email: physmarika@gmail.com
- Linkedin: https://github.com/budhathokidinesh

## Thank you Message

---

Thank you for visiting (MERN) React Fullstack E-Commerce website. I hope you find it usefull and engaging. You can build advance website with more functionalities. Your feedback ad contributions are highly appreciated.
