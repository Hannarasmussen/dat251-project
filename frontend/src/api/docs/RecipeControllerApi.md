# RecipeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addIngredient**](#addingredient) | **POST** /api/recipe/{recipeId}/ingredients | |
|[**create1**](#create1) | **POST** /api/recipe | |
|[**deleteById1**](#deletebyid1) | **DELETE** /api/recipe/{id} | |
|[**findAll1**](#findall1) | **GET** /api/recipe | |
|[**findById1**](#findbyid1) | **GET** /api/recipe/{id} | |
|[**removeIngredient**](#removeingredient) | **DELETE** /api/recipe/{recipeId}/ingredients/{recipeIngredientId} | |
|[**update1**](#update1) | **PUT** /api/recipe | |

# **addIngredient**
> RecipeIngredient addIngredient(recipeIngredientEntity)


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration,
    RecipeIngredientEntity
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let recipeId: string; // (default to undefined)
let recipeIngredientEntity: RecipeIngredientEntity; //

const { status, data } = await apiInstance.addIngredient(
    recipeId,
    recipeIngredientEntity
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeIngredientEntity** | **RecipeIngredientEntity**|  | |
| **recipeId** | [**string**] |  | defaults to undefined|


### Return type

**RecipeIngredient**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create1**
> Recipe create1(recipeEntity)


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration,
    RecipeEntity
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let recipeEntity: RecipeEntity; //

const { status, data } = await apiInstance.create1(
    recipeEntity
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeEntity** | **RecipeEntity**|  | |


### Return type

**Recipe**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteById1**
> deleteById1()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteById1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findAll1**
> Array<Recipe> findAll1()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

const { status, data } = await apiInstance.findAll1();
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

# **findById1**
> Recipe findById1()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.findById1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Recipe**

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

# **removeIngredient**
> removeIngredient()


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let recipeId: string; // (default to undefined)
let recipeIngredientId: string; // (default to undefined)

const { status, data } = await apiInstance.removeIngredient(
    recipeId,
    recipeIngredientId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeId** | [**string**] |  | defaults to undefined|
| **recipeIngredientId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update1**
> Recipe update1(recipe)


### Example

```typescript
import {
    RecipeControllerApi,
    Configuration,
    Recipe
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipeControllerApi(configuration);

let recipe: Recipe; //

const { status, data } = await apiInstance.update1(
    recipe
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipe** | **Recipe**|  | |


### Return type

**Recipe**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

