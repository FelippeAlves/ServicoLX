const { Router } = require('express');
const { LoginController, SetLocationController } = require('./controller/accountController');

const { 
    GetAllServicePaginatedController,
    GetServicesByFilterController,
    GetServicesByCategoryPaginatedController,
    GetServicesByCategoryAndFilterPaginatedController,
    CreateServiceController,
    GetServicesByFilterPaginatedController,
    GetAllAdsByUserPaginatedController,
    GetAdsByUserAndFilterPaginatedController,
    GetAllAdsByUsersFavoritesPaginatedController,
    SetFavoriteController,
    RetrieveFavoriteController,
    IncrementServiceController,
    IncrementRatingController
} = require('./controller/serviceController');

const { 
    NewCategoryController,
    GetAllCategoriesController,
    GetAllCategoriesPaginatedController 
} = require('./controller/categoryController');

const routes = Router();

// ACCOUNT CONTROLLERS
routes.post('/account/register', (req, res) => {
    return LoginController(req, res);
});

routes.post('/account/setNewLocation', (req, res) => {
    return SetLocationController(req, res);
});


// SERVICE CONTROLLERS
routes.post('/service/getAllAdsPaginated', (req, res) => {
    return GetAllServicePaginatedController(req, res);
});

routes.post('/service/getAdsByFilter', (req, res) => {
    return GetServicesByFilterController(req, res);
});

routes.post('/service/getAdsByFilterPaginated', (req, res) => {
    return GetServicesByFilterPaginatedController(req, res);
});

routes.post('/service/getAdsByCategoryPaginated', (req, res) => {
    return GetServicesByCategoryPaginatedController(req, res);
});

routes.post('/service/getAdsByCategoryAndFilterPaginated', (req, res) => {
    return GetServicesByCategoryAndFilterPaginatedController(req, res);
});

routes.post('/service/getAllAdsByUserPaginated', (req, res) => {
    return GetAllAdsByUserPaginatedController(req, res);
});

routes.post('/service/getAdsByUserAndFilterPaginated', (req, res) => {
    return GetAdsByUserAndFilterPaginatedController(req, res);
});

routes.post('/service/getAllAdsByUsersFavoritesPaginated', (req, res) => {
    return GetAllAdsByUsersFavoritesPaginatedController(req, res);
});

routes.post('/service/setFavorite', (req, res) => {
    return SetFavoriteController(req, res);
});

routes.post('/service/retrieveFavorite', (req, res) => {
    return RetrieveFavoriteController(req, res);
});

routes.post('/service/createService', (req, res) => {
    return CreateServiceController(req, res);
});

routes.post('/service/incrementHiredService', (req, res) => {
    return IncrementServiceController(req, res);
});

routes.post('/service/incrementRatingService', (req, res) => {
    return IncrementRatingController(req, res);
});

// CATEGORY CONTROLLERS
routes.get('/category/getAll', (req, res) => {
    return GetAllCategoriesController(res);
});

routes.get('/category/getAllPaginated', (req, res) => {
    return GetAllCategoriesPaginatedController(res);
});

routes.post('/category/new', (req, res) => {
    return NewCategoryController(req, res);
});

module.exports = routes;
