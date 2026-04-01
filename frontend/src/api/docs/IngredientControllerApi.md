# IngredientControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create2**](#create2) | **POST** /api/ingredient | |
|[**deleteById2**](#deletebyid2) | **DELETE** /api/ingredient/{id} | |
|[**findAll2**](#findall2) | **GET** /api/ingredient | |
|[**findById2**](#findbyid2) | **GET** /api/ingredient/{id} | |

# **create2**
> Ingredient create2(ingredientEntity)


### Example

```typescript
import {
    IngredientControllerApi,
    Configuration,
    IngredientEntity
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientControllerApi(configuration);

let ingredientEntity: IngredientEntity; //

const { status, data } = await apiInstance.create2(
    ingredientEntity
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ingredientEntity** | **IngredientEntity**|  | |


### Return type

**Ingredient**

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

# **deleteById2**
> deleteById2()


### Example

```typescript
import {
    IngredientControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteById2(
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

# **findAll2**
> Array<Ingredient> findAll2()


### Example

```typescript
import {
    IngredientControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientControllerApi(configuration);

const { status, data } = await apiInstance.findAll2();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Ingredient>**

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

# **findById2**
> Ingredient findById2()


### Example

```typescript
import {
    IngredientControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.findById2(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Ingredient**

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

