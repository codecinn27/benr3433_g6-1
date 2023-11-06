
// // Create a middleware function to protect the '/admin' route
// module.exports.adminAuthenticationMiddleware = async(req, res, next) => {
//     // Get the username and password from the request
//     const { username, password } = req.body;
//     // Define a list of authorized admin users and their passwords
//     authorizedAdmins = [
//         { username: 'admin', password: 'adminPassword123' },
//         // Add more authorized admin users if needed
//     ];
//     // Check if the user is an authorized admin
//     const isAdminAuthorized = await authorizedAdmins.some(admin => admin.username === username && admin.password === password);

//     if (isAdminAuthorized) {
//         // User is authorized, proceed to the '/admin' route
//         next();
//     } else {
//         // User is not authorized, redirect to the login page or display an error
//         res.redirect('/login'); // You can redirect to a login page or display an error message
//     }
//     next();
// };


