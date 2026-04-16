# RecipeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllRecipes**](#getallrecipes) | **GET** /api/recipe | |
|[**getRecipeById**](#getrecipebyid) | **GET** /api/recipe/{id} | |

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

