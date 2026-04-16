# FavoriteControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addFavorite**](#addfavorite) | **POST** /api/favorites/{recipeId} | |
|[**getFavorites**](#getfavorites) | **GET** /api/favorites | |
|[**isFavorited**](#isfavorited) | **GET** /api/favorites/{recipeId} | |
|[**removeFavorite**](#removefavorite) | **DELETE** /api/favorites/{recipeId} | |

# **addFavorite**
> addFavorite()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let recipeId: string; // (default to undefined)

const { status, data } = await apiInstance.addFavorite(
    recipeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeId** | [**string**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getFavorites**
> Array<RecipeSummaryDto> getFavorites()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

const { status, data } = await apiInstance.getFavorites();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RecipeSummaryDto>**

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

# **isFavorited**
> boolean isFavorited()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let recipeId: string; // (default to undefined)

const { status, data } = await apiInstance.isFavorited(
    recipeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

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

# **removeFavorite**
> removeFavorite()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let recipeId: string; // (default to undefined)

const { status, data } = await apiInstance.removeFavorite(
    recipeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recipeId** | [**string**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

