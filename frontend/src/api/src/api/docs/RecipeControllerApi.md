# RecipeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllCategories**](#getallcategories) | **GET** /api/recipe/categories | |
|[**getAllRecipes**](#getallrecipes) | **GET** /api/recipe | |
|[**getRandomRecipe**](#getrandomrecipe) | **GET** /api/recipe/random | |
|[**getRecipeById**](#getrecipebyid) | **GET** /api/recipe/{id} | |
|[**getRecipesByCategory**](#getrecipesbycategory) | **GET** /api/recipe/by-category | |
|[**searchRecipesByName**](#searchrecipesbyname) | **GET** /api/recipe/search | |

# **getAllCategories**
> Array<string> getAllCategories()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

const { status, data } = await apiInstance.getAllCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllRecipes**
> Array<Recipe> getAllRecipes()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

const { status, data } = await apiInstance.getAllRecipes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Recipe>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRandomRecipe**
> DetailedRecipe getRandomRecipe()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

const { status, data } = await apiInstance.getRandomRecipe();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DetailedRecipe**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRecipeById**
> DetailedRecipe getRecipeById()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getRecipeById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**DetailedRecipe**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRecipesByCategory**
> Array<Recipe> getRecipesByCategory()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let category: string; // (default to undefined)

const { status, data } = await apiInstance.getRecipesByCategory(
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **category** | [**string**] |  | defaults to undefined|


### Return type

**Array<Recipe>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchRecipesByName**
> Array<DetailedRecipe> searchRecipesByName()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let name: string; // (default to undefined)

const { status, data } = await apiInstance.searchRecipesByName(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|


### Return type

**Array<DetailedRecipe>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

